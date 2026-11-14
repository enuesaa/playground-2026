'use server'

import { generateAuthenticationOptions, generateRegistrationOptions, verifyAuthenticationResponse, verifyRegistrationResponse, type AuthenticationResponseJSON, type RegistrationResponseJSON } from '@simplewebauthn/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { loadDb, saveDb } from '../lib/db'

const rpID = 'localhost'
const origin = 'http://localhost:3000'
const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: origin.startsWith('https'),
} as const

const setChallenge = async (challenge: string) => {
  const cookieStore = await cookies()
  cookieStore.set('challenge', challenge, { ...cookieOpts, maxAge: 300 })
}

const getChallenge = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('challenge')?.value ?? ''
}

const startSession = async (db: Awaited<ReturnType<typeof loadDb>>, userName: string) => {
  const token = crypto.randomUUID()
  db.sessions[token] = userName
  await saveDb(db)

  const cookieStore = await cookies()
  cookieStore.set('session', token, { ...cookieOpts, maxAge: 60 * 60 * 24 * 7 })
  revalidatePath('/')
}

export async function registerOptions(userName: string) {
  const options = await generateRegistrationOptions({
    rpName: 'my-nextjs-template',
    rpID,
    userName: userName,
    attestationType: 'none',
    authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
  })
  await setChallenge(options.challenge)
  return options
}

export async function registerVerify(userName: string, res: RegistrationResponseJSON) {
  const expectedChallenge = await getChallenge()
  const v = await verifyRegistrationResponse({
    response: res,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  })
  if (!v.verified) throw new Error('verification failed')

  const { credential } = v.registrationInfo
  const db = await loadDb()
  db.creds[credential.id] = {
    userName,
    publicKey: Buffer.from(credential.publicKey).toString('base64url'),
    counter: credential.counter,
  }
  await startSession(db, userName)
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

  const expectedChallenge = await getChallenge()
  const v = await verifyAuthenticationResponse({
    response: res,
    expectedChallenge,
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
  await startSession(db, cred.userName)
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  revalidatePath('/')
}
