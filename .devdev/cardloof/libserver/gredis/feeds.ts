import { ulid } from 'ulid'
import { redis } from './conn'

export const listFeeds = async (): Promise<FeedEntity[]> => {
  const keys = await redis.keys('feed-*')
  
  const list: FeedEntity[] = []
  for (const key of keys) {
    const data = (await redis.get(key)) as FeedEntity
    list.push(data)
  }
  return list
}

export type FeedEntity = {
  key: string
  title: string
  url: string
  description: string
}
export const saveFeed = async (data: Omit<FeedEntity, 'key'>) => {
  const entry: FeedEntity = {
    ...data,
    key: `feed-${ulid()}`
  }
  await redis.set(entry.key, entry)
}
