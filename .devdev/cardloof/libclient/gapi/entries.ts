import useSWR from 'swr'
import { fetcher, InferResponse, mutator } from './client'
import useSWRMutation from 'swr/mutation'
import { GET } from '@/app/api/entries/route'

export const fetchEntries = () => useSWR<InferResponse<typeof GET>>('/api/entries', fetcher)

export const markSpeaked = () => useSWRMutation(`/api/mark-speaked`, mutator)
