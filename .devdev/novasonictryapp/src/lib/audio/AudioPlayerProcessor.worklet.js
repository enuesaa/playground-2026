class AudioPlayerProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.buf = new Float32Array(48000);
        this.r = 0;
        this.w = 0;
        this.port.onmessage = (e) => {
            let d = e.data;
            if (this.w + d.length > this.buf.length) {
                let nb = new Float32Array((this.buf.length + d.length) * 2);
                nb.set(this.buf.subarray(this.r, this.w));
                this.buf = nb;
                this.w -= this.r;
                this.r = 0;
            }
            this.buf.set(d, this.w);
            this.w += d.length;
        };
    }
    process(_, outputs) {
        let out = outputs[0][0];
        let len = Math.min(out.length, this.w - this.r);
        out.set(this.buf.subarray(this.r, this.r + len));
        this.r += len;
        return true;
    }
}
registerProcessor("audio-player-processor", AudioPlayerProcessor);
