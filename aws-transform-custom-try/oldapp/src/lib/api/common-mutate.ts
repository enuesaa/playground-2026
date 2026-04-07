import { useMutation, useQueryClient } from '@tanstack/react-query'

export type MutateOptions = {
	headers: {
		[key: string]: string
	}
	invalidate: string[]
}
export const useApiMutate = <T, R>(method: string, path: string, options: Partial<MutateOptions> = {}) => {
	const resolvedOptions = { headers: {}, invalidate: [], ...options }
	const queryClient = useQueryClient()

	return useMutation<R, Error, T>({
		mutationFn: async (body: T): Promise<R> => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_BASE}${path}`, {
				method,
				headers: {
					'Content-Type': 'application/json',
					...resolvedOptions.headers,
				},
				body: JSON.stringify(body),
			})
			return await res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: resolvedOptions.invalidate })
		},
	})
}
