import { useApiQuery, type QueryOptions } from './common-query'
import { useApiMutate, type MutateOptions } from './common-mutate'

export const useQueryGet = <R>(path: string, options: Partial<QueryOptions> = {}) => useApiQuery<R>('GET', path, options)

export const useMutatePost = <T, R>(path: string, options: Partial<MutateOptions> = {}) =>
	useApiMutate<T, R>('POST', path, options)

export const useMutatePut = <T, R>(path: string, options: Partial<MutateOptions> = {}) =>
	useApiMutate<T, R>('PUT', path, options)

export const useMutateDelete = <T, R>(path: string, options: Partial<MutateOptions> = {}) =>
	useApiMutate<T, R>('DELETE', path, options)
