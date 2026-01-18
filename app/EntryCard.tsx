'use client'

import { MouseEventHandler, useCallback, useEffect, useRef } from 'react'
import { PlayIcon, StopIcon } from '../lib/icons'
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

  const handlePlay: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    audioRef.current ? stopPlayback() : startPlayback()
  }

  useEffect(() => {
    stopPlayback()
    if (autoPlayEnabled) {
      startPlayback()
    }
    return stopPlayback
  }, [autoPlayEnabled, startPlayback, stopPlayback])

  return (
    <div className='relative overflow-hidden rounded-[20px] border border-white/10 bg-linear-to-r from-white/5 via-white/0 to-amber-200/5 min-h-60'>
      {entry.imageUrl && (
        <img
          src={entry.imageUrl}
          className='h-64 w-full object-cover sm:h-80 transition duration-700 group-hover:scale-[1.05]'
        />
      )}
      <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent' />
      <div className='absolute inset-0 flex flex-col justify-between p-4 sm:p-5'>
        <div className='flex justify-end'>
          <button
            onClick={handlePlay}
            className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur transition hover:-translate-y-px hover:bg-white/25 hover:ring-amber-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/90'
          >
            {audioRef.current ? <StopIcon /> : <PlayIcon />}
          </button>
        </div>
        <div className='text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl'>
          {entry.title}
        </div>
      </div>
    </div>
  )
}
