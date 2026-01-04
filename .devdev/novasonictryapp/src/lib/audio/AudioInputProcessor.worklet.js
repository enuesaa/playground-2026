class AudioInputProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
    }

    // 音声入力処理
    process(inputs, outputs) {
        const input = inputs[0];
        if (!input || !input[0]) return true;

        const inputData = input[0];
        const pcmData = new Int16Array(inputData.length);

        // Float32からInt16に変換
        for (let i = 0; i < inputData.length; i++) {
            const clampedValue = Math.max(-1, Math.min(1, inputData[i]));
            pcmData[i] = clampedValue * 0x7FFF;
        }

        // メインスレッドに送信
        this.port.postMessage(pcmData);

        return true;
    }
}

registerProcessor("audio-input-processor", AudioInputProcessor);
