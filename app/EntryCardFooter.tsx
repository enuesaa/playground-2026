'use client'

import { type Entry } from '@/app/api/entries/route'

type Props = {
  entry: Entry
  progress: number
}
export const EntryCardFooter = ({ entry, progress }: Props) => {
  return (
    <section className='absolute bottom-5 w-full'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-3xl font-bold text-white leading-tight tracking-tight drop-shadow-md'>
          {entry.title}
        </div>
        <div
          role='progressbar'
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className='h-3 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15'
        >
          <div
            className='h-full w-full origin-left bg-linear-to-r from-amber-300 via-amber-400 to-white duration-200 ease-out'
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </section>
  )
}
