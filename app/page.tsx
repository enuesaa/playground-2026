'use client'

import { fetchEntries } from '../lib/apiclient'
import { EntryCards } from './EntryCards'

export default function Home() {
  const { data, error, isLoading } = fetchEntries()
  if (isLoading || data === undefined) {
    return <>loading</>
  }
  if (error) {
    return <>{error}</>
  }
  return <EntryCards entries={data} />
}
