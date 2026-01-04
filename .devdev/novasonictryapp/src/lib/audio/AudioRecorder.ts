const WORKLET_URL: string = new URL('./AudioInputProcessor.worklet.js', import.meta.url).toString();
const SAMPLE_RATE = 16000;

export class AudioRecorder {
    private audioContext: AudioContext | null = null;
    private workletNode: AudioWorkletNode | null = null;
    private sourceNode: MediaStreamAudioSourceNode | null = null;

    // 初期化
    async init(mediaStream: MediaStream, onData: (pcmData: Int16Array) => void): Promise<void> {
        this.audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });
        await this.audioContext.audioWorklet.addModule(WORKLET_URL);

        this.workletNode = new AudioWorkletNode(this.audioContext, "audio-input-processor");
        this.sourceNode = this.audioContext.createMediaStreamSource(mediaStream);

        // データ受信ハンドラ
        this.workletNode.port.onmessage = (event) => {
            onData(event.data);
        };

        // 接続
        this.sourceNode.connect(this.workletNode);
        this.workletNode.connect(this.audioContext.destination);
    }

    // 停止
    stop(): void {
        this.sourceNode?.disconnect();
        this.workletNode?.disconnect();
        this.audioContext?.close();
        this.audioContext = null;
        this.workletNode = null;
        this.sourceNode = null;
    }
}
