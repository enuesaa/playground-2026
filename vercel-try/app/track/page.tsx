import { exampleFlag } from '../../flags'
import { track } from '@vercel/analytics/server';
import { reportValue } from 'flags';

// this is on server
export default async function Page() {
  const example = await exampleFlag()

  // see https://vercel.com/docs/feature-flags/integrate-with-web-analytics
  reportValue('example-flag', example);
  track('My Event', {}, { flags: ['example-flag'] })

  return <div>Flag {example ? 'on' : 'off'}</div>
}
