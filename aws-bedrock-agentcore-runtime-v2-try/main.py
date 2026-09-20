import boto3
import json
import uuid

client = boto3.client('bedrock-agentcore', region_name='ap-northeast-1')
payload = json.dumps({"prompt": "こんにちは"})

res = client.invoke_agent_runtime(
    agentRuntimeArn='<agentcore runtime arn>',
    runtimeSessionId=str(uuid.uuid4()),
    payload=payload,
)
resbody = res['response'].read()
data = json.loads(resbody)

print("Response:", data)
