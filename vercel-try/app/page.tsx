'use client'

import { useState } from 'react'
import { ping } from './ping'

export default function Home() {
  const [result, setResult] = useState<any>(null)

  const handleClick = async () => {
    const res = await ping()
    setResult(res)
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <main className='flex flex-col items-center gap-6'>
        <h1 className='text-3xl'>hello</h1>

        <button className='rounded bg-black px-4 py-2 text-white' onClick={handleClick}>
          call
        </button>

        <pre className='text-sm'>{JSON.stringify(result, null, 2)}</pre>
      </main>
    </div>
  )
}
