'use client'

import { markFeedRead } from '@/libclient/gapi/feeds'
import { MouseEventHandler } from 'react'

type Props = {
  feedKey: string
}
export const FeedRead = ({ feedKey }: Props) => {
  const { markReadAndRefetch } = markFeedRead()

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    markReadAndRefetch({ key: feedKey })
  }
  return (
    <button onClick={handleClick} className='cursor-pointer'>
      読んだ
    </button>
  )
}