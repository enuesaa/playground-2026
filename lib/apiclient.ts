import { type Entry } from '@/app/api/entries/route'
import useSWRMutation from 'swr/mutation'

export type VoiceId = 'Takumi' | 'Kazuha'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const invokeTTS = async (text: string, voice: VoiceId): Promise<string> => {
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

  return url
}

export const fetchEntries = () => useSWR<Entry[]>('/api/entries', fetcher)

export const markSpeaked = () =>
  useSWRMutation(`/api/mark-speaked`, (url: string, { arg }: { arg: any }) => fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then(res => res.json()))
