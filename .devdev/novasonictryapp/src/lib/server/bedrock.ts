import { BedrockRuntimeClient, InvokeModelWithBidirectionalStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { NodeHttp2Handler } from "@smithy/node-http-handler";
import { randomUUID } from "node:crypto";
import { Subject, firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

const AC = { audioType: "SPEECH", encoding: "base64", mediaType: "audio/lpcm", sampleRateHertz: 16000, sampleSizeBits: 16, channelCount: 1 };
const SYS = "You are a friend. Keep responses short (2-3 sentences).";

export class StreamSession {
    public isActive: boolean = true;
    public promptName: string = randomUUID();
    public audioId: string = randomUUID();
    private audioStarted: boolean = false;

    constructor(private sessionId: string, private client: NovaSonicBidirectionalStreamClient) { }

    async init(): Promise<void> {
        this.client.queue(this.sessionId, { sessionStart: { inferenceConfiguration: { maxTokens: 1024, temperature: 0.7, topP: 0.9 } } });
        this.client.queue(this.sessionId, { promptStart: { promptName: this.promptName, textOutputConfiguration: { mediaType: "text/plain" }, audioOutputConfiguration: { ...AC, sampleRateHertz: 24000, voiceId: "tiffany" } } });
        let tid = randomUUID();
        this.client.queue(this.sessionId, { contentStart: { promptName: this.promptName, contentName: tid, type: "TEXT", role: "SYSTEM", interactive: false, textInputConfiguration: { mediaType: "text/plain" } } });
        this.client.queue(this.sessionId, { textInput: { promptName: this.promptName, contentName: tid, content: SYS } });
        this.client.queue(this.sessionId, { contentEnd: { promptName: this.promptName, contentName: tid } });
    }

    async streamAudio(chunk: Buffer): Promise<void> {
        if (!this.isActive) return;
        if (!this.audioStarted) {
            this.client.queue(this.sessionId, { contentStart: { promptName: this.promptName, contentName: this.audioId, type: "AUDIO", role: "USER", interactive: true, audioInputConfiguration: AC } });
            this.audioStarted = true;
        }
        this.client.queue(this.sessionId, { audioInput: { promptName: this.promptName, contentName: this.audioId, content: chunk.toString('base64') } });
    }

    async sendText(text: string): Promise<void> {
        let tid = randomUUID();
        this.client.queue(this.sessionId, { contentStart: { promptName: this.promptName, contentName: tid, type: "TEXT", role: "USER", interactive: true, textInputConfiguration: { mediaType: "text/plain" } } });
        this.client.queue(this.sessionId, { textInput: { promptName: this.promptName, contentName: tid, content: text } });
        this.client.queue(this.sessionId, { contentEnd: { promptName: this.promptName, contentName: tid } });
    }

    async close(): Promise<void> {
        if (this.audioStarted) {
            this.client.queue(this.sessionId, { contentEnd: { promptName: this.promptName, contentName: this.audioId } });
        }
        this.client.queue(this.sessionId, { promptEnd: { promptName: this.promptName } });
        this.client.queue(this.sessionId, { sessionEnd: {} });
        await new Promise(r => setTimeout(r, 100));
        this.isActive = false;
        let s = this.client.sessions.get(this.sessionId);
        if (s) s.isActive = false;
    }
}

export class NovaSonicBidirectionalStreamClient {
    private bclient: BedrockRuntimeClient;
    public sessions: Map<string, any> = new Map();

    constructor(config: { clientConfig: any }) {
        this.bclient = new BedrockRuntimeClient({ ...config.clientConfig, requestHandler: new NodeHttp2Handler({ requestTimeout: 300000, sessionTimeout: 300000 }) });
    }

    createSession(sid: string) {
        let s = { events: [], signal: new Subject<void>(), isActive: true };
        this.sessions.set(sid, s);
        return new StreamSession(sid, this);
    }

    queue(sid: string, event: any): void {
        let s = this.sessions.get(sid);
        if (s) { s.events.push({ event }); s.signal.next(); }
    }

    async start(sid: string, handlers: any): Promise<void> {
        let s = this.sessions.get(sid);
        if (!s) return;
        let body: any = {
            [Symbol.asyncIterator]: () => ({
                next: async () => {
                    while (s.events.length === 0 && s.isActive) {
                        await firstValueFrom(s.signal.pipe(take(1)));
                    }
                    if (s.events.length === 0) return { done: true, value: undefined };
                    return { done: false, value: { chunk: { bytes: new TextEncoder().encode(JSON.stringify(s.events.shift())) } } };
                }
            })
        };
        try {
            let res = await this.bclient.send(new InvokeModelWithBidirectionalStreamCommand({ modelId: "amazon.nova-2-sonic-v1:0", body }));
            if (!res.body) return;
            for await (const ev of res.body) {
                if (ev.chunk) {
                    let json = JSON.parse(new TextDecoder().decode(ev.chunk.bytes));
                    if (json.event) Object.entries(json.event).forEach(([k, v]) => handlers[k]?.(v));
                } else if (ev.internalServerException) throw ev.internalServerException;
                else if (ev.modelStreamErrorException) throw ev.modelStreamErrorException;
            }
        } catch (e) {
            console.error(`Stream error for ${sid}:`, e);
            handlers.error?.(e);
        } finally { s.isActive = false; this.sessions.delete(sid); handlers.streamComplete?.(); }
    }
}
