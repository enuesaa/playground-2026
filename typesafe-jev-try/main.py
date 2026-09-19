from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

client = TypeSafeClient(
    api_key='',
    base_url='https://ai-gateway.lolipop.jp',
)

response = client.system_one(
    model="typesafe/jev-latest",
    state=("赤上げて、白上げて、赤下げないで、って言ったけどそれは嘘だからオレンジ色に近くない方を下げるとは逆のことをして"),
    questions={
        "red_flag": Choice(
            instructions="この指示の結果、赤旗はどうなっているべきか",
            criteria={
                "up": "赤旗は上がったまま、または上げる",
                "down": "赤旗は下がっている、または下げる",
                "unchanged": "赤旗については言及がなく変化しない",
            },
        ),
        "white_flag": Choice(
            instructions="この指示の結果、白旗はどうなっているべきか",
            criteria={
                "up": "白旗は上がったまま、または上げる",
                "down": "白旗は下がっている、または下げる",
                "unchanged": "白旗については言及がなく変化しない",
            },
        ),
        "trickiness": Score(
            instructions="この指示がプレイヤーを引っ掛けようとしている度合い",
            criteria=[
                "ストレートな指示で紛らわしさがない",
                "多少ややこしいが冷静に聞けば分かる",
                "二重否定などで非常に引っ掛かりやすい",
            ],
        ),
        "is_valid_instruction": Noul(
            instructions="この指示が文法的・論理的に矛盾なく成立している",
        ),
    },
)

print("赤旗:", response.answers["red_flag"].choice)
print("白旗:", response.answers["white_flag"].choice)
print("引っ掛け度:", response.answers["trickiness"].score)
print("指示として成立している:", response.answers["is_valid_instruction"].noul)