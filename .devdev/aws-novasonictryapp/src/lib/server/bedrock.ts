import { BedrockRuntimeClient, InvokeModelWithBidirectionalStreamCommand } from '@aws-sdk/client-bedrock-runtime'
import { NodeHttp2Handler } from '@smithy/node-http-handler'
import { randomUUID } from 'node:crypto'
import { Subject, firstValueFrom } from 'rxjs'
import { take } from 'rxjs/operators'

// 音声設定
const AUDIO_CONFIG = {
	audioType: 'SPEECH',
	encoding: 'base64',
	mediaType: 'audio/lpcm',
	sampleRateHertz: 16000,
	sampleSizeBits: 16,
	channelCount: 1,
}

const SYSTEM_PROMPT = 'You are a friend. Keep responses short (2-3 sentences).'

// ストリームセッション管理
export class StreamSession {
	public isActive: boolean = true
	public promptName: string = randomUUID()
	public audioId: string = randomUUID()
	private audioStarted: boolean = false

	constructor(
		private sessionId: string,
		private client: NovaSonicBidirectionalStreamClient
	) {}

	// セッション初期化
	async init(): Promise<void> {
		// セッション開始
		this.client.queue(this.sessionId, {
			sessionStart: {
				inferenceConfiguration: {
					maxTokens: 1024,
					temperature: 0.7,
					topP: 0.9,
				},
			},
		})

		// プロンプト開始
		this.client.queue(this.sessionId, {
			promptStart: {
				promptName: this.promptName,
				textOutputConfiguration: { mediaType: 'text/plain' },
				audioOutputConfiguration: {
					...AUDIO_CONFIG,
					sampleRateHertz: 24000,
					voiceId: 'tiffany',
				},
			},
		})

		// システムプロンプト送信
		const textContentId = randomUUID()
		this.client.queue(this.sessionId, {
			contentStart: {
				promptName: this.promptName,
				contentName: textContentId,
				type: 'TEXT',
				role: 'SYSTEM',
				interactive: false,
				textInputConfiguration: { mediaType: 'text/plain' },
			},
		})
		this.client.queue(this.sessionId, {
			textInput: {
				promptName: this.promptName,
				contentName: textContentId,
				content: SYSTEM_PROMPT,
			},
		})
		this.client.queue(this.sessionId, {
			contentEnd: {
				promptName: this.promptName,
				contentName: textContentId,
			},
		})
	}

	// 音声ストリーミング
	async streamAudio(chunk: Buffer): Promise<void> {
		if (!this.isActive) return

		if (!this.audioStarted) {
			this.client.queue(this.sessionId, {
				contentStart: {
					promptName: this.promptName,
					contentName: this.audioId,
					type: 'AUDIO',
					role: 'USER',
					interactive: true,
					audioInputConfiguration: AUDIO_CONFIG,
				},
			})
			this.audioStarted = true
		}

		this.client.queue(this.sessionId, {
			audioInput: {
				promptName: this.promptName,
				contentName: this.audioId,
				content: chunk.toString('base64'),
			},
		})
	}

	// テキスト送信
	async sendText(text: string): Promise<void> {
		const textContentId = randomUUID()

		this.client.queue(this.sessionId, {
			contentStart: {
				promptName: this.promptName,
				contentName: textContentId,
				type: 'TEXT',
				role: 'USER',
				interactive: true,
				textInputConfiguration: { mediaType: 'text/plain' },
			},
		})
		this.client.queue(this.sessionId, {
			textInput: {
				promptName: this.promptName,
				contentName: textContentId,
				content: text,
			},
		})
		this.client.queue(this.sessionId, {
			contentEnd: {
				promptName: this.promptName,
				contentName: textContentId,
			},
		})
	}

	// セッション終了
	async close(): Promise<void> {
		if (this.audioStarted) {
			this.client.queue(this.sessionId, {
				contentEnd: {
					promptName: this.promptName,
					contentName: this.audioId,
				},
			})
		}

		this.client.queue(this.sessionId, {
			promptEnd: { promptName: this.promptName },
		})
		this.client.queue(this.sessionId, {
			sessionEnd: {},
		})

		await new Promise((resolve) => setTimeout(resolve, 100))

		this.isActive = false
		const session = this.client.sessions.get(this.sessionId)
		if (session) session.isActive = false
	}
}

// Bedrock双方向ストリームクライアント
export class NovaSonicBidirectionalStreamClient {
	private bedrockClient: BedrockRuntimeClient
	public sessions: Map<string, any> = new Map()

	constructor(config: { clientConfig: any }) {
		this.bedrockClient = new BedrockRuntimeClient({
			...config.clientConfig,
			requestHandler: new NodeHttp2Handler({
				requestTimeout: 300000,
				sessionTimeout: 300000,
			}),
		})
	}

	// セッション作成
	createSession(sessionId: string) {
		const session = {
			events: [],
			signal: new Subject<void>(),
			isActive: true,
		}
		this.sessions.set(sessionId, session)
		return new StreamSession(sessionId, this)
	}

	// イベントキューに追加
	queue(sessionId: string, event: any): void {
		const session = this.sessions.get(sessionId)
		if (session) {
			session.events.push({ event })
			session.signal.next()
		}
	}

	// ストリーム開始
	async start(sessionId: string, handlers: any): Promise<void> {
		const session = this.sessions.get(sessionId)
		if (!session) return

		// 非同期イテレータ作成
		const body: any = {
			[Symbol.asyncIterator]: () => ({
				next: async () => {
					// イベント待機
					while (session.events.length === 0 && session.isActive) {
						await firstValueFrom(session.signal.pipe(take(1)))
					}

					if (session.events.length === 0) {
						return { done: true, value: undefined }
					}

					const eventData = session.events.shift()
					const encodedData = new TextEncoder().encode(JSON.stringify(eventData))
					return { done: false, value: { chunk: { bytes: encodedData } } }
				},
			}),
		}

		try {
			// Bedrockストリーム実行
			const command = new InvokeModelWithBidirectionalStreamCommand({
				modelId: 'amazon.nova-2-sonic-v1:0',
				body,
			})
			const response = await this.bedrockClient.send(command)

			if (!response.body) return

			// レスポンス処理
			for await (const event of response.body) {
				if (event.chunk) {
					const decodedData = new TextDecoder().decode(event.chunk.bytes)
					const jsonData = JSON.parse(decodedData)

					if (jsonData.event) {
						Object.entries(jsonData.event).forEach(([eventName, eventData]) => {
							handlers[eventName]?.(eventData)
						})
					}
				} else if (event.internalServerException) {
					throw event.internalServerException
				} else if (event.modelStreamErrorException) {
					throw event.modelStreamErrorException
				}
			}
		} catch (error) {
			console.error(`Stream error for ${sessionId}:`, error)
			handlers.error?.(error)
		} finally {
			session.isActive = false
			this.sessions.delete(sessionId)
			handlers.streamComplete?.()
		}
	}
}
