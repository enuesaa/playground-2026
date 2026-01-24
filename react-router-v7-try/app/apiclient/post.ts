import { z } from 'zod'

export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

export async function fetchPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return res.json()
}

export const createPostSchema = z.object({
  userId: z.number(),
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export async function createPost(input: Omit<Post, 'id'>): Promise<Post> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }
  )
  return res.json()
}
