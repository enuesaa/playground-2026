import { useQuery } from '@tanstack/react-query'

export type QueryOptions = {
	headers: {
		[key: string]: string
	}
}
export const useApiQuery = <R>(method: string, path: string, options: Partial<QueryOptions> = {}) => {
	const resolvedOptions = { headers: {}, ...options }

	return useQuery<R>({
		queryKey: [path],
		queryFn: async (): Promise<R> => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_BASE}${path}`, {
				method,
				headers: {
					Accept: 'application/json',
					...resolvedOptions.headers,
				},
			})
			const data = await res.json()
			return data
		},
	})
}
