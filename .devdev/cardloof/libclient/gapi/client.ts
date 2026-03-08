import { NextResponse } from 'next/server'

export const fetcher = (url: string) => 
  fetch(url).then(res => res.json())

export const mutator = (url: string, { arg }: { arg: any }) =>
  fetch(url, {method: 'POST', body: JSON.stringify(arg)}).then(res => res.json())

// see https://tech.route06.co.jp/entry/2024/07/05/122516
export type InferResponse<T> = T extends (...a: any[]) => Promise<NextResponse<infer U>> ? U : never
