'use server'

import {
  CognitoIdentityProviderClient,
  CompleteWebAuthnRegistrationCommand,
  DeleteWebAuthnCredentialCommand,
  InitiateAuthCommand,
  ListWebAuthnCredentialsCommand,
  RespondToAuthChallengeCommand,
  StartWebAuthnRegistrationCommand,
  type AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const cognito = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION })
const ClientId = process.env.COGNITO_CLIENT_ID
const cookieOptions = { httpOnly: true, sameSite: 'lax', path: '/', secure: false } as const

const startSession = async (username: string, authResult?: AuthenticationResultType) => {
  const accessToken = authResult?.AccessToken
  if (!accessToken) throw new Error('no access token')

  const maxAge = authResult?.ExpiresIn ?? 3600
  const cookieStore = await cookies()
  cookieStore.set('access_token', accessToken, { ...cookieOptions, maxAge })
  cookieStore.set('username', username, { ...cookieOptions, maxAge })
  revalidatePath('/')
}

const getAccessToken = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  if (!accessToken) throw new Error('not signed in')

  return accessToken
}

// 初回サインイン(パスキー登録に必要なアクセストークンを取る)
export async function passwordLogin(username: string, password: string) {
  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId,
    AuthParameters: { USERNAME: username, PASSWORD: password },
  })
  const response = await cognito.send(command)

  await startSession(username, response.AuthenticationResult)
}

export async function registerOptions() {
  const accessToken = await getAccessToken()
  const command = new StartWebAuthnRegistrationCommand({ AccessToken: accessToken })
  const response = await cognito.send(command)

  return response.CredentialCreationOptions as any
}

export async function registerVerify(credential: unknown) {
  const accessToken = await getAccessToken()
  const command = new CompleteWebAuthnRegistrationCommand({
    AccessToken: accessToken,
    Credential: credential as any,
  })

  await cognito.send(command)
}

export async function loginOptions(username: string) {
  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_AUTH',
    ClientId,
    AuthParameters: { USERNAME: username, PREFERRED_CHALLENGE: 'WEB_AUTHN' },
  })
  const response = await cognito.send(command)

  const session = response.Session
  const requestOptions = response.ChallengeParameters?.CREDENTIAL_REQUEST_OPTIONS
  if (response.ChallengeName !== 'WEB_AUTHN' || !session || !requestOptions) {
    throw new Error(`unexpected challenge: ${response.ChallengeName}`)
  }

  const cookieStore = await cookies()
  cookieStore.set('auth_session', session, { ...cookieOptions, maxAge: 180 })

  return JSON.parse(requestOptions)
}

export async function loginVerify(username: string, credential: unknown) {
  const cookieStore = await cookies()
  const session = cookieStore.get('auth_session')?.value
  if (!session) throw new Error('no auth session')

  const command = new RespondToAuthChallengeCommand({
    ChallengeName: 'WEB_AUTHN',
    ClientId,
    Session: session,
    ChallengeResponses: { USERNAME: username, CREDENTIAL: JSON.stringify(credential) },
  })
  const response = await cognito.send(command)

  cookieStore.delete('auth_session')
  await startSession(username, response.AuthenticationResult)
}

export async function listPasskeys() {
  const accessToken = await getAccessToken()
  const command = new ListWebAuthnCredentialsCommand({ AccessToken: accessToken })
  const response = await cognito.send(command)
  const credentials = response.Credentials ?? []

  return credentials.map((credential) => ({
    id: credential.CredentialId ?? '',
    name: credential.FriendlyCredentialName ?? '',
    attachment: credential.AuthenticatorAttachment ?? '',
    createdAt: credential.CreatedAt?.toISOString() ?? '',
  }))
}

export async function deletePasskey(credentialId: string) {
  const accessToken = await getAccessToken()
  const command = new DeleteWebAuthnCredentialCommand({ AccessToken: accessToken, CredentialId: credentialId })

  await cognito.send(command)
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
  cookieStore.delete('username')
  revalidatePath('/')
}
