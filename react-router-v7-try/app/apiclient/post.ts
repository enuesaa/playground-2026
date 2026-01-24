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

export async function createPost(input: Omit<Post, 'id'>): Promise<Post> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }
  )
  return res.json()
}
