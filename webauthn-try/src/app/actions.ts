'use server'

import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticationResponseJSON,
  type RegistrationResponseJSON,
} from '@simplewebauthn/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { loadDb, saveDb } from '../lib/db'

const rpID = process.env.RP_ID ?? 'localhost'
const origin = process.env.ORIGIN ?? 'http://localhost:3000'
const cookieOpts = { httpOnly: true, sameSite: 'lax', path: '/', secure: origin.startsWith('https') } as const

const setChallenge = async (challenge: string) => (await cookies()).set('challenge', challenge, { ...cookieOpts, maxAge: 300 })
const getChallenge = async () => (await cookies()).get('challenge')?.value ?? ''

const startSession = async (db: Awaited<ReturnType<typeof loadDb>>, username: string) => {
  const token = crypto.randomUUID()
  db.sessions[token] = username
  await saveDb(db)
  ;(await cookies()).set('session', token, { ...cookieOpts, maxAge: 60 * 60 * 24 * 7 })
  revalidatePath('/')
}

export async function registerOptions(username: string) {
  const options = await generateRegistrationOptions({
    rpName: 'my-nextjs-template',
    rpID,
    userName: username,
    attestationType: 'none',
    authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
  })
  await setChallenge(options.challenge)
  return options
}

export async function registerVerify(username: string, res: RegistrationResponseJSON) {
  const v = await verifyRegistrationResponse({
    response: res,
    expectedChallenge: await getChallenge(),
    expectedOrigin: origin,
    expectedRPID: rpID,
  })
  if (!v.verified) throw new Error('verification failed')

  const { credential } = v.registrationInfo
  const db = await loadDb()
  db.creds[credential.id] = {
    username,
    publicKey: Buffer.from(credential.publicKey).toString('base64url'),
    counter: credential.counter,
  }
  await startSession(db, username)
}

export async function loginOptions() {
  const options = await generateAuthenticationOptions({ rpID, userVerification: 'preferred' })
  await setChallenge(options.challenge)
  return options
}

export async function loginVerify(res: AuthenticationResponseJSON) {
  const db = await loadDb()
  const cred = db.creds[res.id]
  if (!cred) throw new Error('unknown credential')

  const v = await verifyAuthenticationResponse({
    response: res,
    expectedChallenge: await getChallenge(),
    expectedOrigin: origin,
    expectedRPID: rpID,
    credential: {
      id: res.id,
      publicKey: new Uint8Array(Buffer.from(cred.publicKey, 'base64url')),
      counter: cred.counter,
    },
  })
  if (!v.verified) throw new Error('verification failed')

  cred.counter = v.authenticationInfo.newCounter
  await startSession(db, cred.username) // saveDb も内部で実行される
}

export async function logout() {
  ;(await cookies()).delete('session')
  revalidatePath('/')
}
