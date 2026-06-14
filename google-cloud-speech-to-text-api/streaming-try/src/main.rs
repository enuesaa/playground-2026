use anyhow::{Context, Result};
use clap::Parser;
use gcp_auth::provider;
use hound::WavReader;
use tokio::sync::mpsc;
use tokio_stream::wrappers::ReceiverStream;
use tonic::{
    metadata::MetadataValue,
    transport::{Channel, ClientTlsConfig},
    Request,
};

pub mod speech {
    tonic::include_proto!("google.cloud.speech.v1");
}

use speech::{
    speech_client::SpeechClient,
    streaming_recognize_request::StreamingRequest,
    RecognitionConfig, StreamingRecognitionConfig, StreamingRecognizeRequest,
};

/// 約100ms ぶんのチャンクサイズ (16kHz×16bit×1ch = 3200 bytes/100ms)
const CHUNK_BYTES: usize = 3200;

#[derive(Parser, Debug)]
#[command(about = "Google Cloud Speech-to-Text streaming demo")]
struct Args {
    /// 送信する WAV ファイルパス
    #[arg(short, long)]
    wav: String,

    /// 認識言語コード (例: ja-JP, en-US)
    #[arg(short, long, default_value = "ja-JP")]
    lang: String,

    /// 途中結果も表示する
    #[arg(long, default_value_t = true)]
    interim: bool,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();

    // 1. WAV 読み込み
    let (pcm_data, sample_rate) = read_wav(&args.wav)
        .with_context(|| format!("WAV ファイルを読み込めません: {}", args.wav))?;
    println!(
        "WAV 読み込み完了: {} bytes, {}Hz",
        pcm_data.len(),
        sample_rate
    );

    // 2. GCP 認証 (gcp_auth 0.12 API)
    //    GOOGLE_APPLICATION_CREDENTIALS または ADC を自動検出
    let auth_provider = provider().await
        .context("GCP 認証の初期化に失敗しました。GOOGLE_APPLICATION_CREDENTIALS を確認してください")?;
    let scopes = &["https://www.googleapis.com/auth/cloud-platform"];
    let token = auth_provider.token(scopes).await
        .context("アクセストークンの取得に失敗しました")?;
    let bearer = format!("Bearer {}", token.as_str());

    // 3. gRPC チャネル (TLS) — システムの証明書ストアを使用
    let channel = Channel::from_static("https://speech.googleapis.com")
        .tls_config(ClientTlsConfig::new().with_native_roots())?
        .connect()
        .await
        .context("speech.googleapis.com への接続に失敗しました")?;

    let mut client = SpeechClient::new(channel);

    // 4. streaming 用 mpsc チャネル
    let (tx, rx) = mpsc::channel::<StreamingRecognizeRequest>(64);

    // 最初のメッセージ: 認識設定
    tx.send(StreamingRecognizeRequest {
        streaming_request: Some(StreamingRequest::StreamingConfig(
            StreamingRecognitionConfig {
                config: Some(RecognitionConfig {
                    encoding: speech::recognition_config::AudioEncoding::Linear16 as i32,
                    sample_rate_hertz: sample_rate as i32,
                    language_code: args.lang.clone(),
                    enable_automatic_punctuation: true,
                    ..Default::default()
                }),
                interim_results: args.interim,
                single_utterance: false,
            },
        )),
    })
    .await?;

    // 5. オーディオをチャンクで送信
    let tx_clone = tx.clone();
    tokio::spawn(async move {
        for chunk in pcm_data.chunks(CHUNK_BYTES) {
            let msg = StreamingRecognizeRequest {
                streaming_request: Some(StreamingRequest::AudioContent(chunk.to_vec())),
            };
            if tx_clone.send(msg).await.is_err() {
                break;
            }
        }
        println!("オーディオ送信完了");
        // tx_clone がドロップされてストリーム終端を通知
    });
    drop(tx); // spawn 外の tx をドロップ

    // 6. リクエスト送信
    let mut request = Request::new(ReceiverStream::new(rx));
    request.metadata_mut().insert(
        "authorization",
        MetadataValue::try_from(bearer.as_str())?,
    );

    let mut stream = client
        .streaming_recognize(request)
        .await
        .context("StreamingRecognize の呼び出しに失敗しました")?
        .into_inner();

    // 7. 結果受信
    println!("\n=== 認識結果 ===");
    while let Some(response) = stream.message().await? {
        for result in &response.results {
            let label = if result.is_final { "✅ [確定]" } else { "⏳ [途中]" };
            if let Some(alt) = result.alternatives.first() {
                println!("{} {}", label, alt.transcript);
                if result.is_final && alt.confidence > 0.0 {
                    println!("   信頼度: {:.1}%", alt.confidence * 100.0);
                }
            }
        }
    }
    println!("=== 完了 ===");

    Ok(())
}

/// WAV → LINEAR16 PCM バイト列 + サンプルレート
fn read_wav(path: &str) -> Result<(Vec<u8>, u32)> {
    let mut reader = WavReader::open(path)
        .with_context(|| format!("hound で WAV を開けません: {path}"))?;
    let spec = reader.spec();
    let sample_rate = spec.sample_rate;

    let samples: Vec<i16> = match spec.sample_format {
        hound::SampleFormat::Int => match spec.bits_per_sample {
            16 => reader.samples::<i16>().map(|s| s.unwrap()).collect(),
            8 => reader
                .samples::<i32>()
                .map(|s| ((s.unwrap() as i16).wrapping_sub(128)) << 8)
                .collect(),
            24 => reader
                .samples::<i32>()
                .map(|s| (s.unwrap() >> 8) as i16)
                .collect(),
            b => anyhow::bail!("未対応のビット深度: {b}"),
        },
        hound::SampleFormat::Float => reader
            .samples::<f32>()
            .map(|s| (s.unwrap() * i16::MAX as f32) as i16)
            .collect(),
    };

    // ステレオ → モノラル (ch0 のみ)
    let mono: Vec<i16> = if spec.channels > 1 {
        samples.chunks(spec.channels as usize).map(|ch| ch[0]).collect()
    } else {
        samples
    };

    let bytes: Vec<u8> = mono.iter().flat_map(|s| s.to_le_bytes()).collect();
    Ok((bytes, sample_rate))
}
