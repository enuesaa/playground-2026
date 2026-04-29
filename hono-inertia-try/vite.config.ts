import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import ssrPlugin from 'vite-ssr-components/plugin'
import { inertiaPages } from '@hono/inertia/vite'

export default defineConfig({
  plugins: [
    inertiaPages({
      pagesDir: 'src/pages', outFile: 'src/pages.gen.ts'
    }),
    cloudflare(),
    ssrPlugin(),
  ],
})