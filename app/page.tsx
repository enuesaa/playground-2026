'use client'

import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import entries from './data.json'

type Entry = {
  about: string
  title: string
  shortTitle?: string
  link: string
  subjects: string[]
  comments: string[]
  imageUrl?: string
  count?: number
}

type VoiceId = 'Takumi' | 'Kazuha'

const items = entries as Entry[]
const SLIDE_DURATION = 10000

function useSlideshow(length: number, durationMs: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!length) return undefined

    let frameId = 0
    let start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const ratio = Math.min(elapsed / durationMs, 1)
      setProgress(ratio)

      if (ratio >= 1) {
        start = now
        setProgress(0)
        setActiveIndex((prev) => (prev + 1) % length)
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [length, durationMs])

  return { activeIndex, progress }
}

function EntryCard({
  entry,
  autoPlayKey,
  autoPlayEnabled,
}: {
  entry: Entry
  autoPlayKey: number
  autoPlayEnabled: boolean
}) {
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
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, voice }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate speech')
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
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
        className='block w-full overflow-hidden rounded-[24px] bg-white/10 ring-1 ring-white/10 shadow-lg shadow-black/40 transition hover:-translate-y-[2px] hover:ring-amber-200/60 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/80'
      >
        <div className='flex flex-col gap-4'>
          {entry.imageUrl ? (
            <div className='relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-amber-200/5'>
              <img
                src={entry.imageUrl}
                alt={entry.title}
                className='h-64 w-full object-cover transition duration-700 group-hover:scale-[1.05] sm:h-80'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />
              <div className='absolute inset-0 flex flex-col justify-between p-4 sm:p-5'>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={handlePlay}
                    aria-pressed={isPlaying}
                    aria-label={isPlaying ? '音声停止' : '音声再生'}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur transition hover:-translate-y-px hover:bg-white/25 hover:ring-amber-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/90'
                  >
                    <svg
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      className='h-5 w-5 fill-current'
                    >
                      {isPlaying ? (
                        <path d='M8 5h3v14H8V5zm5 0h3v14h-3V5z' />
                      ) : (
                        <path d='M7 4.5v15l11-7.5-11-7.5z' />
                      )}
                    </svg>
                  </button>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs uppercase tracking-[0.24em] text-amber-200/80'>
                    headline
                  </p>
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
                  <svg
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                    className='h-5 w-5 fill-current'
                  >
                    {isPlaying ? (
                      <path d='M8 5h3v14H8V5zm5 0h3v14h-3V5z' />
                    ) : (
                      <path d='M7 4.5v15l11-7.5-11-7.5z' />
                    )}
                  </svg>
                </button>
              </div>
              <p className='text-xs uppercase tracking-[0.24em] text-amber-200/80'>
                headline
              </p>
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

export default function Home() {
  const { activeIndex, progress } = useSlideshow(items.length, SLIDE_DURATION)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false)
  const current = items[activeIndex]

  if (!current) return null

  const handleFirstInteraction = () => {
    if (!autoPlayEnabled) {
      setAutoPlayEnabled(true)
    }
  }

  return (
    <div
      className='min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(255,210,128,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_30%),linear-gradient(to_bottom,#0f0f11,#050507)] text-zinc-50'
      onClick={handleFirstInteraction}
    >
      <main className='mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-5 py-8 sm:px-10 sm:py-10'>
        <header className='flex items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300/80'>
              instant brief
            </p>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
              今日のニュースをサクッと
            </h1>
          </div>
          {!autoPlayEnabled && (
            <span className='rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-amber-200 ring-1 ring-white/10 backdrop-blur'>
              クリックで音声オン
            </span>
          )}
        </header>

        <section className='flex flex-1 items-center justify-center'>
          <div className='relative w-full max-w-4xl'>
            <div className='absolute -inset-6 -z-10 rounded-[32px] bg-white/5 blur-3xl opacity-60' />
            <div className='absolute -inset-1 -z-10 rounded-[32px] bg-gradient-to-r from-white/10 via-amber-200/15 to-cyan-200/20 opacity-70 blur-xl' />

            <div className='flex w-full flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6'>
              <EntryCard key={current.link} entry={current} autoPlayKey={activeIndex} autoPlayEnabled={autoPlayEnabled} />
              <div
                role='progressbar'
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                className='h-3 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15'
              >
                <div
                  className='h-full w-full origin-left bg-gradient-to-r from-amber-300 via-amber-400 to-white transition-[transform] duration-200 ease-out'
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
