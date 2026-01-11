'use client'

import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import entries from './data.json'

type Entry = {
  about: string
  title: string
  link: string
  subjects: string[]
  comments: string[]
  imageUrl?: string
  count?: number
}

const items = entries as Entry[]

function EntryCard({ entry }: { entry: Entry }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const queueRef = useRef<string[]>([])

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    queueRef.current = []
    setIsPlaying(false)
  }, [])

  const playNext = useCallback(async () => {
    const next = queueRef.current.shift()
    if (!next) {
      setIsPlaying(false)
      return
    }

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: next }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate speech')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => {
        URL.revokeObjectURL(url)
        playNext()
      }
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        stopPlayback()
      }
      await audio.play()
    } catch (error) {
      console.error(error)
      stopPlayback()
    }
  }, [stopPlayback])

  useEffect(() => {
    return () => {
      stopPlayback()
    }
  }, [stopPlayback])

  const handlePlay = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!entry.comments?.length) {
      return
    }

    if (isPlaying) {
      stopPlayback()
      return
    }

    queueRef.current = [...entry.comments]
    setIsPlaying(true)
    await playNext()
  }

  return (
    <article className='group w-full'>
      <a
        href={entry.link}
        target='_blank'
        rel='noreferrer'
        className='block w-full overflow-hidden rounded-3xl bg-white/95 ring-1 ring-zinc-200 shadow-sm transition hover:-translate-y-[3px] hover:ring-amber-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:bg-zinc-900/70 dark:ring-zinc-800 dark:hover:ring-amber-400/50'
      >
        <div className='flex flex-col gap-3'>
          {entry.imageUrl ? (
            <div className='relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800'>
              <img
                src={entry.imageUrl}
                alt={entry.title}
                className='h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-80'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-900/80 to-transparent' />
              <div className='absolute inset-0 flex flex-col justify-between p-4 sm:p-5'>
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={handlePlay}
                    aria-pressed={isPlaying}
                    aria-label={isPlaying ? '音声停止' : '音声再生'}
                    className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900/80 text-white backdrop-blur transition hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:bg-zinc-800/80'
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
                  <h2 className='text-2xl font-semibold leading-snug tracking-tight text-white drop-shadow-md sm:text-3xl'>
                    {entry.title}
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <div className='relative flex flex-col gap-2 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800'>
              <div className='absolute right-3 top-3'>
                <button
                  type='button'
                  onClick={handlePlay}
                  aria-pressed={isPlaying}
                  aria-label={isPlaying ? '音声停止' : '音声再生'}
                  className='inline-flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900/80 text-white backdrop-blur transition hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:bg-zinc-800/80'
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
              <h2 className='text-2xl font-semibold leading-snug tracking-tight text-zinc-900 transition group-hover:text-amber-800 dark:text-zinc-50 dark:group-hover:text-amber-200 sm:text-3xl'>
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
  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-100'>
      <main className='mx-auto flex w-full max-w-none flex-col gap-6 px-0 py-0 text-[17px] sm:px-0 sm:text-[18px]'>
        <header className='flex flex-col gap-2 px-5 sm:px-8'>
          <p className='text-xs font-semibold uppercase tracking-[0.12em] text-amber-700 dark:text-amber-300'>
            Fresh reads
          </p>
        </header>

        <section className='flex flex-col gap-0'>
          {items.map((entry) => {
            return <EntryCard key={entry.link} entry={entry} />
          })}
        </section>
      </main>
    </div>
  )
}
