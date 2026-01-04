import type { Handle } from '@sveltejs/kit';
import { setupWebSocketServer } from '$lib/server/websocket';

let wsServer: any = null;

export const handle: Handle = async ({ event, resolve }) => {
    // WebSocketサーバー初期化（初回のみ）
    if (!wsServer && event.platform) {
        const server = (event.platform as any).server;
        if (server) {
            wsServer = setupWebSocketServer(server);
        }
    }

    return resolve(event);
};
