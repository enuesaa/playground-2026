import { ulid } from 'ulid'
import { redis } from './conn'

export type EntryEntity = {
  key: string
  title: string
  titleOriginal: string
  url: string
  comments: string[]
  commentsOriginal: string[]
  imageUrl: string | null
  popularity: number
}
export const saveEntry = async (data: Omit<EntryEntity, 'key'>) => {
  const entry: EntryEntity = {
    ...data,
    key: `entry-${ulid()}`
  }
  await redis.set(entry.key, entry)
}