'use client'

import { track } from '@vercel/analytics'

// see https://vercel.com/docs/feature-flags/integrate-with-web-analytics
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Web Analytics Button</h1>

      <button onClick={() => track('My Event', {}, { flags: ['A'] })}>
        A button
      </button>

      <button onClick={() => track('My Event', {}, { flags: ['B'] })}>
        B button
      </button>
    </main>
  )
}
