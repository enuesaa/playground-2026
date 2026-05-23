from google.cloud.speech_v2 import SpeechClient
from google.cloud.speech_v2.types import cloud_speech
from google.oauth2 import service_account
from google.api_core import client_options
from pprint import pprint

def transcribe(audio_uri: str) -> cloud_speech.BatchRecognizeResults:
    credentials = service_account.Credentials.from_service_account_file('tmp/cred.json')
    client = SpeechClient(
        credentials=credentials,
        client_options=client_options.ClientOptions(
            api_endpoint="us-central1-speech.googleapis.com",
        )
    )

    cmd = client.batch_recognize(
        request=cloud_speech.BatchRecognizeRequest(
            recognizer=f"projects/{credentials.project_id}/locations/us-central1/recognizers/_",
            config=cloud_speech.RecognitionConfig(
                auto_decoding_config=cloud_speech.AutoDetectDecodingConfig(),
                language_codes=["ja-JP"],
                model="chirp_2", # see https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages?hl=ja
            ),
            files=[
                cloud_speech.BatchRecognizeFileMetadata(uri=audio_uri),
            ],
            recognition_output_config=cloud_speech.RecognitionOutputConfig(
                inline_response_config=cloud_speech.InlineOutputConfig(),
            ),
        ),
    )
    print("Waiting resposne...")

    response = cmd.result(timeout=120)
    pprint(response)
    if response is None:
        raise Exception("response is none")

    for result in response.results[audio_uri].transcript.results:
        print(f"Transcript: {result.alternatives[0].transcript}")

    return response.results[audio_uri].transcript

transcribe(audio_uri="gs://example/aa.wav")
