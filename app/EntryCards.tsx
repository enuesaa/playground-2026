'use client'

import { EntryCard } from './EntryCard'
import { EntryCardFooter } from './EntryCardFooter'
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
    <>
      <EntryCard entry={current} autoPlayEnabled={autoPlayEnabled} />
      <EntryCardFooter entry={current} progress={progress} />
    </>
  )
}
