import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export const GET = async () => {
  const result = await redis.get('item')

  return new NextResponse(JSON.stringify({ result }), { status: 200 })
}
