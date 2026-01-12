'use client'

import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function run() {
    setText('')
    setLoading(true)

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Invent a new holiday and describe its traditions.',
      }),
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      setText((t) => t + decoder.decode(value))
    }

    setLoading(false)
  }

  return (
    <main style={{ padding: 24 }}>
      <button onClick={run} disabled={loading}>
        {loading ? 'generating...' : 'run'}
      </button>

      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>
        {text}
      </pre>
    </main>
  )
}
