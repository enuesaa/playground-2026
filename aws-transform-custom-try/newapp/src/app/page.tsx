'use client'

import PageTitle from '@/lib/components/PageTitle'
import { useListPosts } from '@/lib/api/posts'
import Link from 'next/link'

export default function HomePage() {
  const posts = useListPosts()

  return (
    <>
      <PageTitle title="Top Page" />

      {posts.data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0 m-0 list-none">
          {posts.data.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="bg-grayer border-grayer rounded-xl p-4 border shadow-sm h-full transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
