'use client'

import { useState } from 'react'
import { EntryCard } from './EntryCard'
import { useSlideshow } from './use'
import { Entry } from '../lib/apiclient'

type Props = {
  entries: Entry[]
}
export const EntryCards = ({ entries }: Props) => {
  const { activeIndex, progress } = useSlideshow(entries.length, 10000)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false)
  const current = entries[activeIndex]

  if (!current) return null

  const handleFirstInteraction = () => {
    if (!autoPlayEnabled) {
      setAutoPlayEnabled(true)
    }
  }

  return (
    <div
      className='min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(255,210,128,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_30%),linear-gradient(to_bottom,#0f0f11,#050507)] text-zinc-50'
      onClick={handleFirstInteraction}
    >
      <main className='mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-5 py-8 sm:px-10 sm:py-10'>
        <header className='flex items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300/80'>instant brief</p>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>今日のニュースをサクッと</h1>
          </div>
          {!autoPlayEnabled && (
            <span className='rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-amber-200 ring-1 ring-white/10 backdrop-blur'>
              クリックで音声オン
            </span>
          )}
        </header>

        <section className='flex flex-1 items-center justify-center'>
          <div className='relative w-full max-w-4xl'>
            <div className='absolute -inset-6 -z-10 rounded-4xl bg-white/5 blur-3xl opacity-60' />
            <div className='absolute -inset-1 -z-10 rounded-4xl bg-linear-to-r from-white/10 via-amber-200/15 to-cyan-200/20 opacity-70 blur-xl' />

            <div className='flex w-full flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6'>
              <EntryCard
                key={current.link}
                entry={current}
                autoPlayKey={activeIndex}
                autoPlayEnabled={autoPlayEnabled}
              />
              <div
                role='progressbar'
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                className='h-3 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15'
              >
                <div
                  className='h-full w-full origin-left bg-linear-to-r from-amber-300 via-amber-400 to-white transition-[transform] duration-200 ease-out'
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
