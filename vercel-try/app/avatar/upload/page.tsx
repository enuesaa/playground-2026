'use client'

import type { PutBlobResult } from '@vercel/blob'
import { useState, useRef, FormEventHandler } from 'react'

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [blob, setBlob] = useState<PutBlobResult | undefined>()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected')
    }
    const file = inputFileRef.current.files[0]
    const res = await fetch(`/api/avatar/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    })
    const result: PutBlobResult = await res.json()

    setBlob(result)
  }

  return (
    <>
      <h1>Upload</h1>

      <form onSubmit={handleSubmit}>
        <input name='file' ref={inputFileRef} type='file' accept='image/jpeg, image/png, image/webp' required />
        <button type='submit'>Upload</button>
      </form>

      {blob && (
        <div>
          Url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  )
}
