const WorkletUrl: string = new URL('./AudioPlayerProcessor.worklet.js', import.meta.url).toString();

export class AudioPlayer {
    public initialized: boolean = false;
    private ctx: AudioContext | null = null;
    private node: AudioWorkletNode | null = null;

    constructor() { }

    async init(): Promise<void> {
        this.ctx = new AudioContext({ sampleRate: 24000 });
        await this.ctx.audioWorklet.addModule(WorkletUrl);
        this.node = new AudioWorkletNode(this.ctx, "audio-player-processor");
        this.node.connect(this.ctx.destination);
        this.initialized = true;
    }

    playAudio(samples: Float32Array): void {
        this.node?.port.postMessage(samples);
    }

    stop(): void {
        this.ctx?.close();
        this.initialized = false;
    }
}
