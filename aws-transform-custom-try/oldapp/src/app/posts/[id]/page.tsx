'use client'

import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import PageTitle from '@/lib/components/PageTitle'
import { useGetPost } from '@/lib/api/posts'
import EditLink from './EditLink'

export default function PostDetailPage() {
  const params = useParams()
  const id = Number(params.id)

  if (Number.isNaN(id)) {
    notFound()
  }

  const post = useGetPost(id)

  return (
    <>
      <PageTitle title="Detail" />

      {post.data !== undefined && (
        <>
          <div className="text-lg px-3 bg-grayer py-5">
            {post.data.title}
          </div>
          <EditLink id={id} />
        </>
      )}
    </>
  )
}
