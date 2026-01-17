'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SvgStop, SvgPlay } from './svgs'
import { callTts, VoiceId } from './client'
import { type Entry } from './types'

type Props = {
  entry: Entry
  autoPlayKey: number
  autoPlayEnabled: boolean
}
export const EntryCard = ({ entry, autoPlayKey, autoPlayEnabled }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const sessionRef = useRef(0)

  const stopPlayback = useCallback(() => {
    sessionRef.current += 1
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    setIsPlaying(false)
  }, [])

  const playQueue = useCallback(async (itemsToRead: { text: string; voice: VoiceId }[], sessionId: number) => {
    for (const { text, voice } of itemsToRead) {
      if (sessionRef.current !== sessionId) return

      try {
        const url = await callTts(text, voice)
        const audio = new Audio(url)
        audioRef.current = audio

        await new Promise<void>((resolve) => {
          const cleanup = () => {
            audio.onended = null
            audio.onerror = null
            audio.onpause = null
            resolve()
          }

          audio.onended = cleanup
          audio.onerror = cleanup
          audio.onpause = cleanup
          void audio.play().catch(cleanup)
        })

        URL.revokeObjectURL(url)
      } catch (error) {
        console.error(error)
      }

      if (sessionRef.current !== sessionId) {
        return
      }
    }

    if (sessionRef.current === sessionId) {
      setIsPlaying(false)
    }
  }, [])

  const startPlayback = useCallback(() => {
    const queue: { text: string; voice: VoiceId }[] = []

    const headline = entry.shortTitle ?? entry.title
    if (headline) {
      queue.push({ text: headline, voice: 'Takumi' })
    }
    for (const comment of entry.comments ?? []) {
      if (comment) queue.push({ text: comment, voice: 'Kazuha' })
    }

    if (!queue.length) {
      return
    }

    const sessionId = sessionRef.current + 1
    sessionRef.current = sessionId
    setIsPlaying(true)
    void playQueue(queue, sessionId)
  }, [entry.comments, entry.shortTitle, entry.title, playQueue])

  const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (isPlaying) {
      stopPlayback()
    } else {
      startPlayback()
    }
  }

  useEffect(() => {
    stopPlayback()
    if (autoPlayEnabled) {
      startPlayback()
    }
    return stopPlayback
  }, [autoPlayKey, autoPlayEnabled, startPlayback, stopPlayback])

  return (
    <article className='group w-full'>
      <a
        href={entry.link}
        target='_blank'
        rel='noreferrer'
        className='block w-full overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 shadow-lg shadow-black/40 transition hover:-translate-y-0.5 hover:ring-amber-200/60 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80'
      >
        <div className='flex flex-col gap-4'>
          {entry.imageUrl ? (
            <div className='relative overflow-hidden rounded-[20px] border border-white/10 bg-linear-to-r from-white/5 via-white/0 to-amber-200/5'>
              <img
                src={entry.imageUrl}
                alt={entry.title}
                className='h-64 w-full object-cover transition duration-700 group-hover:scale-[1.05] sm:h-80'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent' />
              <div className='absolute inset-0 flex flex-col justify-between p-4 sm:p-5'>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={handlePlay}
                    aria-pressed={isPlaying}
                    aria-label={isPlaying ? '音声停止' : '音声再生'}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur transition hover:-translate-y-px hover:bg-white/25 hover:ring-amber-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/90'
                  >
                    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-5 w-5 fill-current'>
                      {isPlaying ? <path d='M8 5h3v14H8V5zm5 0h3v14h-3V5z' /> : <path d='M7 4.5v15l11-7.5-11-7.5z' />}
                    </svg>
                  </button>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs uppercase tracking-[0.24em] text-amber-200/80'>headline</p>
                  <h2 className='text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-md sm:text-4xl'>
                    {entry.title}
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <div className='relative flex flex-col gap-3 rounded-[20px] border border-white/10 bg-white/5 p-5'>
              <div className='absolute right-3 top-3'>
                <button
                  type='button'
                  onClick={handlePlay}
                  aria-pressed={isPlaying}
                  aria-label={isPlaying ? '音声停止' : '音声再生'}
                  className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:-translate-y-px hover:bg-white/20 hover:ring-amber-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/90'
                >
                  {isPlaying ? <SvgStop /> : <SvgPlay />}
                </button>
              </div>
              <p className='text-xs uppercase tracking-[0.24em] text-amber-200/80'>headline</p>
              <h2 className='text-3xl font-semibold leading-tight tracking-tight text-white transition group-hover:text-amber-200 sm:text-4xl'>
                {entry.title}
              </h2>
            </div>
          )}
        </div>
      </a>
    </article>
  )
}
