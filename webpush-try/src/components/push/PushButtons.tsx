'use client'

import type { PushSubscription } from 'web-push'
import { saveSubscription, sendTestPush } from '../../app/actions'

const enable = async () => {
  if ((await Notification.requestPermission()) !== 'granted') return

  await navigator.serviceWorker.register('/sw.js')
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  })
  await saveSubscription(sub.toJSON() as PushSubscription)
}

export const PushButtons = () => {
  return (
    <div className='flex gap-2'>
      <button onClick={enable} className='rounded bg-black text-white px-4 py-2'>
        通知を有効にする
      </button>
      <button onClick={() => sendTestPush()} className='rounded bg-white px-4 py-2'>
        テスト送信
      </button>
    </div>
  )
}