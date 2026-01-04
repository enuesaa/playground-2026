import { Server, Socket } from 'socket.io';
import { NovaSonicBidirectionalStreamClient, StreamSession } from './bedrock';

let bclient: NovaSonicBidirectionalStreamClient;

export function setupSocketServer(server: any): Server {
    const io = new Server(server instanceof Server ? server : (server as any).httpServer, { cors: { origin: '*' } });
    if (!bclient) {
        bclient = new NovaSonicBidirectionalStreamClient({
            clientConfig: {
                region: process.env.AWS_REGION || 'us-east-1',
                credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID || '', secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '' }
            }
        });
    }
    io.on('connection', (socket: Socket) => {
        let session: StreamSession | null = null;
        socket.on('startAudio', async () => {
            session = bclient.createSession(socket.id);
            let handlers: any = {};
            ['contentStart', 'textOutput', 'audioOutput', 'contentEnd', 'error'].forEach(e => handlers[e] = (d: any) => socket.emit(e, d));
            handlers.streamComplete = () => socket.emit('streamComplete');
            await session.init();
            bclient.start(socket.id, handlers).catch(() => { });
            socket.emit('audioReady');
        });
        socket.on('audioInput', (d: any) => session?.streamAudio(Buffer.from(d, 'base64')));
        socket.on('textInput', (d: { content: string }) => session?.sendText(d.content));
        socket.on('disconnect', () => { session?.close(); session = null; });
    });
    return io;
}

