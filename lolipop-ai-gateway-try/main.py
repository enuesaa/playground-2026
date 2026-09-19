from openai import OpenAI

client = OpenAI(
    api_key='lolipop ai gateway で発行したトークン',
    base_url='https://ai-gateway.lolipop.jp/v1',
)

completion = client.chat.completions.create(
    model="openai/gpt-5-4",
    messages=[{"role": "user", "content": "プロっぽく整えてほしいぽ！"}],
)

print(completion.choices[0].message.content)
