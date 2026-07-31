import { cacheLife } from 'next/cache';

export async function getUsers() {
  'use cache'

  // 1分だけキャッシュ
  cacheLife("minutes")

  const res = await fetch('https://dummyjson.com/users')
  const data = await res.json()

  console.log('fetch users')

  return {total: data.total}
}
