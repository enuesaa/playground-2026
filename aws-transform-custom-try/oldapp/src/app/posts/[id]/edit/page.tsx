'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import PageTitle from '@/lib/components/PageTitle'
import { useGetPost, useUpdatePost } from '@/lib/api/posts'

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  if (Number.isNaN(id)) {
    notFound()
  }

  const post = useGetPost(id)
  const update = useUpdatePost(id)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (post.data !== undefined) {
      setTitle(post.data.title)
    }
  }, [post.data])

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (post.data === undefined) {
      return
    }
    await update.mutateAsync({
      id: post.data.id,
      title: title,
    })
    router.push(`/posts/${id}`)
  }

  return (
    <>
      <PageTitle title="Edit" />

      {post.data !== undefined && (
        <>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg px-3 bg-grayer py-5 outline-none"
          />
          <button
            onClick={handleUpdate}
            className="inline-block border-b-2 border-dotted cursor-pointer hover:border-dashed"
          >
            save
          </button>
        </>
      )}
    </>
  )
}
