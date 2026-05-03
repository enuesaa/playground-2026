import boto3
import base64
import json
import wave
import io
import time
import requests

s3 = boto3.client('s3')
transcribe = boto3.client('transcribe')

def handle_audio_input(bucket: str, session: str):
    prefix = f"audio/{session}/"
    res = s3.list_objects_v2(Bucket=bucket, Prefix=prefix)
    if "Contents" not in res:
        raise Exception('no chunks')

    chunks = []
    for obj in res["Contents"]:
        key = obj["Key"]
        if not key.endswith(".json"):
            continue
        body = s3.get_object(Bucket=bucket, Key=key)["Body"].read()
        j = json.loads(body)
        chunks.append((j["seq"], base64.b64decode(j["data"])))

    if not chunks:
        raise Exception('no valid chunks')

    chunks.sort(key=lambda x: x[0])
    audio_bytes = b"".join([c[1] for c in chunks])

    buf = io.BytesIO()
    with wave.open(buf, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(16000)
        wf.writeframes(audio_bytes)

    wav_key = f"{prefix}output.wav"
    s3.put_object(Bucket=bucket, Key=wav_key, Body=buf.getvalue(), ContentType="audio/wav")

    job_name = f"job-{session}"
    transcribe.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={"MediaFileUri": f"s3://{bucket}/{wav_key}"},
        MediaFormat="wav",
        LanguageCode="ja-JP"
    )
    uri = wait_for_transcribe(job_name)
    text = fetch_transcript(uri)
    return text

def wait_for_transcribe(job_name: str) -> str:
    while True:
        res = transcribe.get_transcription_job(
            TranscriptionJobName=job_name
        )
        job = res["TranscriptionJob"]
        status = job["TranscriptionJobStatus"]
        if status == "COMPLETED":
            return job["Transcript"]["TranscriptFileUri"]
        if status == "FAILED":
            raise Exception(job.get("FailureReason", "transcribe failed"))
        time.sleep(2)

def fetch_transcript(uri: str) -> str:
    data = requests.get(uri).json()
    return data["results"]["transcripts"][0]["transcript"]
