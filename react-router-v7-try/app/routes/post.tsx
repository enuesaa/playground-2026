import type { Route } from './+types/post'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
  const post = await res.json()
  return post as Post
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { title, body } = loaderData

  return (
    <div className='mx-auto max-w-4/5'>
      <div className='text-amber-300'>{title}</div>
      <div>{body}</div>
    </div>
  )
}
