import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { setupSocketServer } from './src/lib/server/socket'

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: import('vite').ViteDevServer) {
		setupSocketServer(server)
	}
}

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		webSocketServer,
	],
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, './src/lib'),
		},
	}
})
