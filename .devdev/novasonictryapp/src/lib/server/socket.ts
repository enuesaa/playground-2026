import { Server, Socket } from 'socket.io'
import { NovaSonicBidirectionalStreamClient, StreamSession } from './bedrock'

let bedrockClient: NovaSonicBidirectionalStreamClient

// Socket.IOサーバーセットアップ
export function setupSocketServer(server: any): Server {
	const io = new Server(server instanceof Server ? server : (server as any).httpServer, { cors: { origin: '*' } })

	// Bedrockクライアント初期化
	if (!bedrockClient) {
		bedrockClient = new NovaSonicBidirectionalStreamClient({
			clientConfig: {
				region: process.env.AWS_REGION || 'us-east-1',
				credentials: {
					accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
				},
			},
		})
	}

	// クライアント接続処理
	io.on('connection', (socket: Socket) => {
		let session: StreamSession | null = null

		// 音声ストリーム開始
		socket.on('startAudio', async () => {
			session = bedrockClient.createSession(socket.id)

			// イベントハンドラ設定
			const eventNames = ['contentStart', 'textOutput', 'audioOutput', 'contentEnd', 'error']
			const handlers: any = {}

			eventNames.forEach((eventName) => {
				handlers[eventName] = (data: any) => socket.emit(eventName, data)
			})
			handlers.streamComplete = () => socket.emit('streamComplete')

			// セッション開始
			await session.init()
			bedrockClient.start(socket.id, handlers).catch(() => {})
			socket.emit('audioReady')
		})

		// 音声入力
		socket.on('audioInput', (data: any) => {
			session?.streamAudio(Buffer.from(data, 'base64'))
		})

		// テキスト入力
		socket.on('textInput', (data: { content: string }) => {
			session?.sendText(data.content)
		})

		// 切断処理
		socket.on('disconnect', () => {
			session?.close()
			session = null
		})
	})

	return io
}
