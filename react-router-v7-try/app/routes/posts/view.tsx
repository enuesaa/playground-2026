import type { Route } from './+types/view'
import { fetchPost } from '../../apiclient/post'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await fetchPost(params.postId)
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
