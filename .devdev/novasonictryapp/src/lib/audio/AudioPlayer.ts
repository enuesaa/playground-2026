const WORKLET_URL: string = new URL('./AudioPlayerProcessor.worklet.js', import.meta.url).toString()
const SAMPLE_RATE = 24000

export class AudioPlayer {
	public initialized: boolean = false
	private audioContext: AudioContext | null = null
	private workletNode: AudioWorkletNode | null = null

	// 初期化
	async init(): Promise<void> {
		this.audioContext = new AudioContext({ sampleRate: SAMPLE_RATE })
		await this.audioContext.audioWorklet.addModule(WORKLET_URL)
		this.workletNode = new AudioWorkletNode(this.audioContext, 'audio-player-processor')
		this.workletNode.connect(this.audioContext.destination)
		this.initialized = true
	}

	// 音声再生
	playAudio(samples: Float32Array): void {
		this.workletNode?.port.postMessage(samples)
	}

	// 停止
	stop(): void {
		this.audioContext?.close()
		this.initialized = false
	}
}
