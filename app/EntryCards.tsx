'use client'

import { EntryCard } from './EntryCard'
import { EntryCardFooter } from './EntryCardFooter'
import { useSlideshow } from '../libclient/useSlideshow'
import type { Entry } from '@/libclient/types'
import { EntryCardCommentsLayer } from './EntryCardCommentsLayer'
import { markSpeaked } from '@/lib/apiclient'
import { useEffect } from 'react'

type Props = {
  entries: Entry[]
  autoPlayEnabled: boolean
}
export const EntryCards = ({ entries, autoPlayEnabled }: Props) => {
  const { slideNumber, progress } = useSlideshow(entries.length, 10000)
  const current = entries[slideNumber]
  const { trigger: triggerMarkSpeaked } = markSpeaked()

  if (!current) return null
  useEffect(() => {
    triggerMarkSpeaked({ key: current.key })
  }, [current.key])

  return (
    <>
      <EntryCard entry={current} autoPlayEnabled={autoPlayEnabled} />
      <EntryCardCommentsLayer entry={current} />
      <EntryCardFooter entry={current} progress={progress} />
    </>
  )
}
