'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [revealComments, setRevealComments] = useState(false)

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

  useEffect(() => {
    setRevealComments(false)
    const id = requestAnimationFrame(() => setRevealComments(true))
    return () => cancelAnimationFrame(id)
  }, [entry.title, entry.url, entry.comments])

  return (
    <div className='relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-r from-white/5 via-white/0 to-amber-200/5'>
      {entry.imageUrl && (
        <img
          src={entry.imageUrl}
          className='w-full object-cover transition duration-700 group-hover:scale-[1.05]'
        />
      )}
      <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent' />
      <div className='absolute inset-0 flex flex-col p-4 sm:p-5'>
        {entry.comments.length > 0 && (
          <div className='flex flex-1 flex-col gap-3 overflow-hidden text-white sm:gap-4'>
            {entry.comments.map((v, i) => (
              <p
                key={i}
                className={[
                  'text-2xl font-semibold leading-snug sm:text-3xl',
                  'transition-all duration-500 ease-out',
                  'drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]',
                  revealComments ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                ].join(' ')}
                style={{ transitionDelay: `${i*1500}ms`, fontFamily: 'var(--font-pop)' } as React.CSSProperties}
              >
                {v}
              </p>
            ))}
          </div>
        )}
        <div className='mt-4 text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl'>
          {entry.title}
        </div>
      </div>
    </div>
  )
}
