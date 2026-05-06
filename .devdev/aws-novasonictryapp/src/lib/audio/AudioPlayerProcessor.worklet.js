class AudioPlayerProcessor extends AudioWorkletProcessor {
	constructor() {
		super()
		// リングバッファ
		this.buffer = new Float32Array(48000)
		this.readPosition = 0
		this.writePosition = 0

		// 音声データ受信
		this.port.onmessage = (event) => {
			const audioData = event.data

			// バッファ拡張が必要な場合
			if (this.writePosition + audioData.length > this.buffer.length) {
				const newSize = (this.buffer.length + audioData.length) * 2
				const newBuffer = new Float32Array(newSize)

				// 既存データをコピー
				const existingData = this.buffer.subarray(this.readPosition, this.writePosition)
				newBuffer.set(existingData)

				this.buffer = newBuffer
				this.writePosition -= this.readPosition
				this.readPosition = 0
			}

			// 新しいデータを追加
			this.buffer.set(audioData, this.writePosition)
			this.writePosition += audioData.length
		}
	}

	// 音声出力処理
	process(_, outputs) {
		const outputChannel = outputs[0][0]
		const availableData = this.writePosition - this.readPosition
		const dataLength = Math.min(outputChannel.length, availableData)

		// バッファから出力にコピー
		outputChannel.set(this.buffer.subarray(this.readPosition, this.readPosition + dataLength))
		this.readPosition += dataLength

		return true
	}
}

registerProcessor('audio-player-processor', AudioPlayerProcessor)
