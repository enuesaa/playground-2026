import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export const config = {
  matcher: '/:path*',
}

// middleware は proxy に変わった様子
// see https://nextjs.org/docs/messages/middleware-to-proxy
// 移行コマンド: `pnpm dlx @next/codemod@canary middleware-to-proxy .`
export async function proxy() {
  const enabled = await get('enabled')
  if (enabled === undefined || enabled === false) {
    return
  }

  const message = await get('message')

  return NextResponse.json(message)

  // リダイレクト
  return NextResponse.rewrite('https://example.com')
}
