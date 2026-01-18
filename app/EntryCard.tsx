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
  const scrollViewportRef = useRef<HTMLDivElement | null>(null)
  const scrollContentRef = useRef<HTMLDivElement | null>(null)
  const scrollAnimRef = useRef<Animation | null>(null)

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
    const viewport = scrollViewportRef.current
    const content = scrollContentRef.current
    if (!viewport || !content) return

    if (scrollAnimRef.current) scrollAnimRef.current.cancel()
    const startY = viewport.clientHeight
    const endY = Math.min(0, viewport.clientHeight - content.scrollHeight)
    const speed = 80
    const distance = Math.max(0, startY - endY)
    const duration = Math.max(1, (distance / speed) * 1000)
    scrollAnimRef.current = content.animate(
      [{ transform: `translateY(${startY}px)` }, { transform: `translateY(${endY}px)` }],
      { duration, delay: 0, easing: 'linear', fill: 'forwards' },
    )

    return () => {
      if (scrollAnimRef.current) scrollAnimRef.current.cancel()
      scrollAnimRef.current = null
    }
  }, [entry.title, entry.url, entry.comments])

  return (
    <div className='overflow-hidden rounded-4xl border border-white/10 bg-linear-to-r from-white/5 via-white/0 to-amber-200/5'>
      <div className='relative'>
        {entry.imageUrl && (
          <>
            <img
              src={entry.imageUrl}
              className='max-h-[56vh] w-full object-cover transition duration-700 group-hover:scale-[1.03]'
            />
            <div className='pointer-events-none absolute inset-0 bg-black/50' />
          </>
        )}
        {entry.comments.length > 0 && (
          <div ref={scrollViewportRef} className='max-w-3xl pointer-events-none absolute inset-0 overflow-hidden text-white'>
            <div
              ref={scrollContentRef}
              className='flex flex-col gap-8 px-3 py-2 font-bold tracking-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] text-3xl'
            >
              {entry.comments.map((v, i) => (
                <p key={i}>{v}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='border-t border-white/10 bg-black/55 p-4 text-white sm:p-5'>
        <div className='text-2xl font-semibold leading-tight tracking-tight drop-shadow-md sm:text-3xl'>
          {entry.title}
        </div>
      </div>
    </div>
  )
}
