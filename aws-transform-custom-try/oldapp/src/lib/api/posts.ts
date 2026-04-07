import { useQueryGet, useMutatePut } from './common'

type Post = {
	id: number
	title: string
}
export const useListPosts = () => useQueryGet<Post[]>(`/posts`)
export const useGetPost = (id: number) => useQueryGet<Post>(`/posts/${id}`)

type CreatePostRequest = {
	title: string
}
export const useCreatePost = () => useMutatePut<CreatePostRequest, {}>(`/posts`)

type UpdatePostRequest = {
	id: number
	title: string
}
export const useUpdatePost = (id: number) => useMutatePut<UpdatePostRequest, {}>(`/posts/${id}`)
