'use client'

import { useCallback, useEffect, useRef } from 'react'
import { invokeTTS, VoiceId } from '../lib/apiclient'
import { type Entry } from '@/app/api/entries/route'

type Scrpt = {
  text: string
  voice: VoiceId
}
type Props = {
  entry: Entry
  autoPlayEnabled: boolean
}
export const EntryCard = ({ entry, autoPlayEnabled }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startPlayback = useCallback(async () => {
    const scrpts: Scrpt[] = [
      { text: entry.title, voice: 'Takumi' },
      ...entry.comments.map((t) => ({ text: t, voice: 'Kazuha' as const })),
    ]

    for (const scrpt of scrpts) {
      try {
        const url = await invokeTTS(scrpt.text, scrpt.voice)
        const audio = new Audio(url)
        audioRef.current = audio

        await new Promise<void>((resolve) => {
          const cleanup = () => {
            audio.onended = null
            audio.onerror = null
            audio.onpause = null
            resolve()
          }
          audio.onended, audio.onerror, (audio.onpause = cleanup)
          audio.play()
        })
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error(error)
      }
    }
  }, [entry.comments, entry.title])

  const stopPlayback = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.src = ''
    audioRef.current = null
  }, [])

  useEffect(() => {
    stopPlayback()
    if (autoPlayEnabled) {
      startPlayback()
    }
    return stopPlayback
  }, [autoPlayEnabled, startPlayback, stopPlayback])

  return (
    <section className='max-w-5xl mx-auto overflow-hidden rounded-4xl border border-white/10 bg-linear-to-r from-white/5 via-white/0 to-amber-200/5'>
      {entry.imageUrl && (
        <>
          <img
            src={entry.imageUrl}
            className='max-h-[56vh] w-full object-cover transition duration-700 group-hover:scale-[1.03]'
          />
          <div className='pointer-events-none absolute inset-0 bg-black/50' />
        </>
      )}
    </section>
  )
}
