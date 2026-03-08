import useSWR from 'swr'
import { fetcher, InferResponse, mutator } from './client'
import { GET } from '@/app/api/feeds/route'
import useSWRMutation from 'swr/mutation'

export const fetchFeeds = () => useSWR<InferResponse<typeof GET>>('/api/feeds', fetcher)

// export const markFeedRead = () => useSWRMutation(`/api/feedread`, mutator)

export const markFeedRead = () => {
  const { trigger, isMutating } = useSWRMutation(`/api/feedread`, mutator)
  const { mutate } = fetchFeeds()

  const markReadAndRefetch = async (arg: any) => {
    await trigger(arg)
    await mutate()
  }
  return { markReadAndRefetch, isMutating }
}
