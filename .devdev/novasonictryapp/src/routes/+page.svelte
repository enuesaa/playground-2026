<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { io, Socket } from 'socket.io-client'
	import { AudioPlayer } from '$lib/audio/AudioPlayer'
	import { Mic, MicOff } from 'lucide-svelte'

	// 定数
	const AUDIO_SAMPLE_RATE = 16000
	const PROCESSOR_BUFFER_SIZE = 512
	const PCM_MAX_VALUE = 0x7fff
	const INT16_TO_FLOAT_DIVISOR = 32768
	const SCROLL_DELAY_MS = 50

	// 状態
	let socket: Socket
	let audioPlayer: AudioPlayer
	let history: { role: string; message: string }[] = []
	let isStreaming: boolean = false
	let processor: ScriptProcessorNode

	// メッセージ履歴に追加
	const addMessageToHistory = (role: string, message: string) => {
		const updatedHistory = [...history]
		const lastMessage = updatedHistory[updatedHistory.length - 1]

		if (updatedHistory.length && lastMessage.role === role) {
			lastMessage.message += ' ' + message
		} else {
			updatedHistory.push({ role, message })
		}

		history = updatedHistory
		setTimeout(() => {
			const chatElement = document.querySelector('#chat')
			chatElement?.scrollTo(0, chatElement.scrollHeight)
		}, SCROLL_DELAY_MS)
	}

	// 初期化
	onMount(() => {
		socket = io()
		audioPlayer = new AudioPlayer()

		socket.on('textOutput', (data: any) => {
			addMessageToHistory(data.role, data.content)
		})

		socket.on('audioOutput', (data: any) => {
			if (!data.content) return

			const base64Audio = data.content
			const binaryData = Uint8Array.from(atob(base64Audio), (char) => char.charCodeAt(0))
			const int16Array = new Int16Array(binaryData.buffer)
			const floatArray = new Float32Array(int16Array).map((value) => value / INT16_TO_FLOAT_DIVISOR)

			audioPlayer.playAudio(floatArray)
		})
	})

	// 音声ストリーミング切り替え
	async function toggle() {
		// 停止処理
		if (isStreaming) {
			if (processor) processor.disconnect()
			isStreaming = false
			return
		}

		// 開始処理
		const audioContext = new AudioContext({ sampleRate: AUDIO_SAMPLE_RATE })
		const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })

		if (!audioPlayer.initialized) {
			await audioPlayer.init()
		}

		socket.emit('startAudio')

		socket.once('audioReady', () => {
			socket.emit('textInput', { content: 'hi' })

			const source = audioContext.createMediaStreamSource(mediaStream)
			processor = audioContext.createScriptProcessor(PROCESSOR_BUFFER_SIZE, 1, 1)

			processor.onaudioprocess = (event) => {
				if (!isStreaming) return

				const inputData = event.inputBuffer.getChannelData(0)
				const pcmData = new Int16Array(inputData.length)

				// Float32からInt16に変換
				for (let i = 0; i < inputData.length; i++) {
					const clampedValue = Math.max(-1, Math.min(1, inputData[i]))
					pcmData[i] = clampedValue * PCM_MAX_VALUE
				}

				const base64Audio = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)))
				socket.emit('audioInput', base64Audio)
			}

			source.connect(processor)
			processor.connect(audioContext.destination)
		})

		isStreaming = true
	}

	// クリーンアップ
	onDestroy(() => socket?.disconnect())
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
