'use client'

import { EntryCard } from './EntryCard'
import { useSlideshow } from '../lib/useSlideshow'
import { type Entry } from '@/app/api/entries/route'

type Props = {
  entries: Entry[]
  autoPlayEnabled: boolean
}
export const EntryCards = ({ entries, autoPlayEnabled }: Props) => {
  const { slideNumber, progress } = useSlideshow(entries.length, 10000)
  const current = entries[slideNumber]

  if (!current) return null

  return (
    <section className='max-w-4xl mx-auto'>
      <div className='flex w-full flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6'>
        <EntryCard key={current.url} entry={current} autoPlayEnabled={autoPlayEnabled} />
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
    </section>
  )
}
