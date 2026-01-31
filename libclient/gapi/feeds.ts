import useSWR from 'swr'
import { fetcher, InferResponse } from './client'
import { GET } from '@/app/api/feeds/route'

export const fetchFeeds = () => useSWR<InferResponse<typeof GET>>('/api/feeds', fetcher)
