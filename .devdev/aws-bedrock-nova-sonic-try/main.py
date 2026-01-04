from bedrock_agentcore.runtime import BedrockAgentCoreApp
from starlette.websockets import WebSocket

from strands.experimental.bidi.agent import BidiAgent
from strands.experimental.bidi.models.nova_sonic import BidiNovaSonicModel
from strands.experimental.bidi.tools import stop_conversation

data = [
    {
        "title": "都心部でシェアサイクル利用が過去最多に",
        "description": "春の行楽シーズンを背景に、都心部のシェアサイクル利用回数が月間で過去最多を更新した。自治体は今後、駐輪スペースの拡充を検討している。"
    },
    {
        "title": "中小企業向けに生成AI活用セミナー開催",
        "description": "業務効率化を目的とした生成AIの活用方法を紹介するセミナーが開催され、多くの中小企業経営者が参加した。導入事例の共有が注目を集めた。"
    },
    {
        "title": "新型スマートフォン向けOSアップデート公開",
        "description": "主要メーカーが最新OSアップデートを公開し、バッテリー最適化やセキュリティ機能の強化が行われた。対応機種は順次拡大予定としている。"
    },
    {
        "title": "地方都市でリモートワーク移住が加速",
        "description": "通信環境の整備を背景に、地方都市へ移住しリモートワークを行う働き方が広がっている。自治体は補助金制度で後押しする方針だ。"
    },
    {
        "title": "国内スタートアップが新たなクラウド監視ツールを発表",
        "description": "国内スタートアップ企業が、システム障害を早期検知するクラウド監視ツールを発表した。エンジニアの運用負荷軽減が期待されている。"
    },
    {
        "title": "駅前再開発計画、来年度から本格始動へ",
        "description": "老朽化が進んでいた駅前エリアの再開発計画が承認され、来年度から工事が本格化する見通しとなった。商業施設と公共空間の整備が柱となる。"
    }
]

app = BedrockAgentCoreApp()

@app.websocket
async def websocket_handler(websocket: WebSocket, context):
    model = BidiNovaSonicModel(
        model_id='amazon.nova-2-sonic-v1:0',
        provider_config={
            "audio": {"voice": "matthew"},
        },
    )
    agent = BidiAgent(
        model=model,
        tools=[stop_conversation],
        system_prompt=f"日本語で話して。これはあるニュースサイトの RSS フィードを JSON 形式にしたデータです。ユーザーはIT系ニュースに興味があります。ユーザーに合いそうなニュースをいくつかピックアップして早口でユーザーが飽きないよう読み上げてください。データ: ${data}",
    )

    # see https://strandsagents.com/latest/documentation/docs/user-guide/concepts/experimental/bidirectional-streaming/io/?h=websocket.#websocket-io
    try:
        await websocket.accept()
        await agent.run(inputs=[websocket.receive_json], outputs=[websocket.send_json]) # type: ignore
        # await agent.stop()
        await websocket.close()
    except Exception as e:
        print(f"error: {e}")

if __name__ == "__main__":
    app.run()
