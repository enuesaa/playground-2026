import { cookies } from 'next/headers'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

type Db = {
  creds: Record<string, {
    userName: string;
    publicKey: string;
    counter: number;
  }>
  sessions: Record<string, string> // token -> username
}

export const loadDb = async (): Promise<Db> => {
  try {
    return JSON.parse(await readFile('.data/db.json', 'utf8'))
  } catch {
    return { creds: {}, sessions: {} }
  }
}

export const saveDb = async (db: Db) => {
  await mkdir('.data', { recursive: true })
  await writeFile('.data/db.json', JSON.stringify(db, null, 2))
}

export const getUsername = async () => {
  const token = (await cookies()).get('session')?.value
  return token ? (await loadDb()).sessions[token] : undefined
}