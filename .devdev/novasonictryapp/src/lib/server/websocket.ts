import { WebSocketServer, WebSocket } from 'ws';
import { NovaSonicBidirectionalStreamClient, StreamSession } from './bedrock';

let bedrockClient: NovaSonicBidirectionalStreamClient;

// WebSocketサーバーセットアップ
export function setupWebSocketServer(server: any): WebSocketServer {
    const wss = new WebSocketServer({ noServer: true });

    // Bedrockクライアント初期化
    if (!bedrockClient) {
        bedrockClient = new NovaSonicBidirectionalStreamClient({
            clientConfig: {
                region: process.env.AWS_REGION || 'us-east-1',
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
                }
            }
        });
    }

    // アップグレードリクエストを手動処理
    server.on('upgrade', (request: any, socket: any, head: any) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;

        // /ws パスのみWebSocketサーバーで処理
        if (pathname === '/ws') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        }
        // その他（Vite HMRなど）はそのまま通す
    });

    // クライアント接続処理
    wss.on('connection', (ws: WebSocket) => {
        const clientId = Math.random().toString(36).substring(7);
        let session: StreamSession | null = null;

        // メッセージ送信ヘルパー
        const send = (type: string, data: any) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type, data }));
            }
        };

        // メッセージ受信
        ws.on('message', async (message: Buffer) => {
            try {
                const { type, data } = JSON.parse(message.toString());

                // 音声ストリーム開始
                if (type === 'startAudio') {
                    session = bedrockClient.createSession(clientId);

                    // イベントハンドラ設定
                    const eventNames = ['contentStart', 'textOutput', 'audioOutput', 'contentEnd', 'error'];
                    const handlers: any = {};

                    eventNames.forEach(eventName => {
                        handlers[eventName] = (eventData: any) => send(eventName, eventData);
                    });
                    handlers.streamComplete = () => send('streamComplete', {});

                    // セッション開始
                    await session.init();
                    bedrockClient.start(clientId, handlers).catch(() => { });
                    send('audioReady', {});
                }

                // 音声入力
                if (type === 'audioInput' && session) {
                    session.streamAudio(Buffer.from(data, 'base64'));
                }

                // テキスト入力
                if (type === 'textInput' && session) {
                    session.sendText(data.content);
                }
            } catch (error) {
                console.error('WebSocket message error:', error);
            }
        });

        // 切断処理
        ws.on('close', () => {
            session?.close();
            session = null;
        });

        // エラー処理
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    return wss;
}
