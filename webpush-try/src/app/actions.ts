'use server'

import { readFile, writeFile } from 'node:fs/promises'
import webpush from 'web-push'
import type { PushSubscription } from 'web-push'

const file = 'subscriptions.json'

const load = async (): Promise<PushSubscription[]> => {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch {
    return []
  }
}

export async function saveSubscription(sub: PushSubscription) {
  const others = (await load()).filter((s) => s.endpoint !== sub.endpoint)
  await writeFile(file, JSON.stringify([...others, sub]))
}

export async function sendTestPush() {
  webpush.setVapidDetails(
    'mailto:example@example.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const payload = JSON.stringify({ title: 'テスト', body: 'Web Pushが届きました', url: '/' })
  const alive: PushSubscription[] = []

  for (const sub of await load()) {
    try {
      const res = await webpush.sendNotification(sub, payload)
      console.log('push ok', res.statusCode)
      alive.push(sub)
    } catch (e) {
      console.error('push failed', e)
      const status = (e as { statusCode?: number }).statusCode
      if (status !== 404 && status !== 410) alive.push(sub)
    }
  }
  await writeFile(file, JSON.stringify(alive))
}
