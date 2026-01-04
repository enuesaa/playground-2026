<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { AudioPlayer } from '$lib/audio/AudioPlayer'
	import { AudioRecorder } from '$lib/audio/AudioRecorder'
	import { Mic, MicOff } from 'lucide-svelte'

	// 定数
	const INT16_TO_FLOAT_DIVISOR = 32768
	const SCROLL_DELAY_MS = 50

	// 状態
	let ws: WebSocket | null = null
	let audioPlayer: AudioPlayer
	let audioRecorder: AudioRecorder | null = null
	let history: { role: string; message: string }[] = []
	let isStreaming: boolean = false

	// メッセージ履歴に追加
	const addMessageToHistory = (role: string, message: string) => {
		const updatedHistory = [...history]
		const lastMessage = updatedHistory[updatedHistory.length - 1]
		
		if (updatedHistory.length && lastMessage.role === role) {
			lastMessage.message += " " + message
		} else {
			updatedHistory.push({ role, message })
		}
		
		history = updatedHistory
		setTimeout(() => {
			const chatElement = document.querySelector('#chat')
			chatElement?.scrollTo(0, chatElement.scrollHeight)
		}, SCROLL_DELAY_MS)
	}

	// WebSocket送信
	const send = (type: string, data: any) => {
		if (ws?.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({ type, data }))
		}
	}

	// 初期化
	onMount(() => {
		// WebSocket接続
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
		const wsUrl = `${protocol}//${window.location.host}/ws`
		ws = new WebSocket(wsUrl)

		audioPlayer = new AudioPlayer()

		// メッセージ受信
		ws.onmessage = (event) => {
			try {
				const { type, data } = JSON.parse(event.data)

				if (type === 'textOutput') {
					addMessageToHistory(data.role, data.content)
				}

				if (type === 'audioOutput' && data.content) {
					const base64Audio = data.content
					const binaryData = Uint8Array.from(atob(base64Audio), char => char.charCodeAt(0))
					const int16Array = new Int16Array(binaryData.buffer)
					const floatArray = new Float32Array(int16Array).map(value => value / INT16_TO_FLOAT_DIVISOR)
					audioPlayer.playAudio(floatArray)
				}

				if (type === 'audioReady') {
					send('textInput', { content: 'hi' })

					// AudioRecorder初期化
					navigator.mediaDevices.getUserMedia({ audio: true }).then(mediaStream => {
						audioRecorder = new AudioRecorder()
						audioRecorder.init(mediaStream, (pcmData: Int16Array) => {
							if (!isStreaming) return
							const base64Audio = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)))
							send('audioInput', base64Audio)
						})
					})
				}
			} catch (error) {
				console.error('WebSocket message error:', error)
			}
		}

		ws.onerror = (error) => {
			console.error('WebSocket error:', error)
		}

		ws.onclose = () => {
			console.log('WebSocket closed')
		}
	})

	// 音声ストリーミング切り替え
	async function toggle() {
		// 停止処理
		if (isStreaming) {
			audioRecorder?.stop()
			audioRecorder = null
			isStreaming = false
			return
		}

		// 開始処理
		if (!audioPlayer.initialized) {
			await audioPlayer.init()
		}

		send('startAudio', {})
		isStreaming = true
	}

	// クリーンアップ
	onDestroy(() => {
		ws?.close()
		audioRecorder?.stop()
	})
</script>

<div class="flex flex-col flex-1 bg-white h-full font-sans">
	<div id="chat" class="flex-1 overflow-y-auto p-4 space-y-2">
		{#each history as m}
			<div class="flex {m.role === 'USER' ? 'justify-end' : 'justify-start'}">
				<div class="max-w-[80%] p-2 rounded-lg {m.role === 'USER' ? 'bg-blue-500 text-white' : 'bg-gray-100'} text-sm">
					{m.message}
				</div>
			</div>
		{/each}
	</div>
	<div class="p-4 border-t flex justify-center">
		<button
			on:click={toggle}
			class="p-4 rounded-full {isStreaming ? 'bg-red-500' : 'bg-blue-500'} text-white shadow-lg"
		>
			{#if isStreaming}<MicOff />{:else}<Mic />{/if}
		</button>
	</div>
</div>
