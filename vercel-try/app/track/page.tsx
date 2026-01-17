import { exampleFlag } from '../../flags'
import { track } from '@vercel/analytics/server'
import { reportValue } from 'flags'
import { VercelToolbar } from '@vercel/toolbar/next'

// this is on server
export default async function Page() {
  const example = await exampleFlag()

  // see https://vercel.com/docs/feature-flags/integrate-with-web-analytics
  reportValue('example-flag', example)
  track('My Event', {}, { flags: ['example-flag'] })

  // 実際には staff の認可を前段階でして、もし staff であればツールバーを表示するイメージ
  const isStaff = true

  return (
    <>
      <div>Flag {example ? 'on' : 'off'}</div>
      {isStaff && <VercelToolbar />}
    </>
  )
}
