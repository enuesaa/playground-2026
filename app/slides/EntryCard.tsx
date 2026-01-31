'use client'

import { useCallback, useEffect, useRef } from 'react'
import { invokeTTS, VoiceId } from '@/libclient/gapi/tts'
import type { Entry } from '@/libclient/types'

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
    <section className='relative mt-16 mb-24 w-screen overflow-hidden bg-black/30'>
      {entry.imageUrl && (
        <div className='relative'>
          <img
            src={entry.imageUrl}
            className='max-h-[62vh] w-full object-cover contrast-105 saturate-110 transition duration-700 ease-out hover:scale-[1.02]'
          />
          <div className='pointer-events-none absolute inset-0 bg-neutral-900/35' />
          <div className='pointer-events-none absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent' />
          <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-black/15 to-transparent' />
          <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(255,255,255,0.18),transparent_35%,transparent_65%,rgba(255,255,255,0.08))]' />
        </div>
      )}
    </section>
  )
}
