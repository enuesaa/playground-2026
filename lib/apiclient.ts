export type VoiceId = 'Takumi' | 'Kazuha'

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



import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export type Entry = {
  title: string
  shortTitle?: string
  link: string
  subjects: string[]
  comments: string[]
  imageUrl?: string
  count?: number
}
export const fetchEntries = () => useSWR<Entry[]>('/api/entries', fetcher)
