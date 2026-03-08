'use client'

import type { Entry } from '@/libclient/types'

type Props = {
  entry: Entry
}
export const EntryCardCommentsLayer = ({ entry }: Props) => {
  return (
    <div key={entry.url} className='absolute max-w-2xl top-0 bottom-0 z-0 pointer-events-none overflow-hidden'>
      {entry.comments.map((v, i) => {
        if (i > 2) {
          return
        }
        return (
          <div key={i} className='ml-5 mb-10 comment-scroll-up font-bold tracking-tight text-shadow-2xs text-3xl'>
            {v}
          </div>
        )
      })}
    </div>
  )
}
