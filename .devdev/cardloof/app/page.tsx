'use client'

import { fetchFeeds } from '@/libclient/gapi/feeds'
import { FeedRead } from './FeedRead'

export default function Page() {
  const { data, error, isLoading } = fetchFeeds()
  if (isLoading || data === undefined) {
    return <></>
  }
  

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">feeds</h3>
      <div className="w-full max-w-md flex flex-col gap-4">
        {data.map(d => (
          <div
            key={d.key}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-lg font-medium text-gray-700 hover:shadow-lg transition"
          >
            {d.title}
            <FeedRead feedKey={d.key} />
          </div>
        ))}
      </div>
    </main>
  )
}
