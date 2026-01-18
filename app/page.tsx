'use client'

import { useState } from 'react'
import { fetchEntries } from '../lib/apiclient'
import { EntryCards } from './EntryCards'

export default function Home() {
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false)
  const { data, error, isLoading } = fetchEntries()
  if (isLoading || data === undefined) {
    return <></>
  }
  if (error) {
    return <>{error}</>
  }

  const handleToggleAutoPlay = () => {
    setAutoPlayEnabled((v) => !v)
  }

  return (
    <main className='relative min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(255,210,128,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_30%),linear-gradient(to_bottom,#0f0f11,#050507)] text-zinc-50'>
      <header className='absolute top-5 left-5' onClick={handleToggleAutoPlay}>
        {!autoPlayEnabled && (
          <button className='rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-amber-200 ring-1 ring-white/10 backdrop-blur cursor-pointer z-10 relative'>
            音声オン
          </button>
        )}
      </header>
      <EntryCards entries={data} autoPlayEnabled={autoPlayEnabled} />
    </main>
  )
}
