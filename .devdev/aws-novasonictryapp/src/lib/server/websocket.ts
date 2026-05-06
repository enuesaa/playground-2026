import { WebSocketServer, WebSocket } from 'ws'
import { NovaSonicBidirectionalStreamClient, StreamSession } from './bedrock'

let bedrockClient = new NovaSonicBidirectionalStreamClient({
	clientConfig: {
		region: 'ap-northeast-1',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
		},
	},
})

export function setupWebSocketServer(server: any): WebSocketServer {
	const wss = new WebSocketServer({ noServer: true })

	server.on('upgrade', (request: any, socket: any, head: any) => {
		const pathname = new URL(request.url, 'http://localhost').pathname

		if (pathname === '/ws') {
			wss.handleUpgrade(request, socket, head, (ws) => {
				wss.emit('connection', ws, request)
			})
		}
	})

	wss.on('connection', (ws: WebSocket) => {
		const clientId = Math.random().toString(36).substring(7)
		let session: StreamSession | null = null

		const send = (type: string, data: any) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify({ type, data }))
			}
		}

		ws.on('message', async (message: Buffer) => {
			try {
				const { type, data } = JSON.parse(message.toString())

				// 音声ストリーム開始
				if (type === 'startAudio') {
					session = bedrockClient.createSession(clientId)

					// イベントハンドラ
					const handlers: any = {}
					handlers['contentStart'] = (eventData: any) => send('contentStart', eventData)
					handlers['textOutput'] = (eventData: any) => send('textOutput', eventData)
					handlers['audioOutput'] = (eventData: any) => send('audioOutput', eventData)
					handlers['contentEnd'] = (eventData: any) => send('contentEnd', eventData)
					handlers['error'] = (eventData: any) => send('error', eventData)
					handlers['streamComplete'] = () => send('streamComplete', {})

					// セッション開始
					await session.init()
					bedrockClient.start(clientId, handlers).catch(() => {})
					send('audioReady', {})
				}

				// 音声入力
				if (type === 'audioInput' && session) {
					session.streamAudio(Buffer.from(data, 'base64'))
				}
				// テキスト入力
				if (type === 'textInput' && session) {
					session.sendText(data.content)
				}
			} catch (e) {
				console.error('WebSocket message error:', e)
			}
		})

		ws.on('close', () => {
			session?.close()
			session = null
		})
		ws.on('error', (e) => {
			console.error('WebSocket error:', e)
		})
	})
	return wss
}
