import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function POST(req: NextRequest) {
  const reqbody = await req.json()
  const key = reqbody?.key
  const res = await redis.rename(key, `speaked-${key}`)

  return NextResponse.json({})
}
