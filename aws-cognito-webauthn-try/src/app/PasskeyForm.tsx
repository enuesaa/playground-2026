'use client'

import { startAuthentication, startRegistration } from '@simplewebauthn/browser'
import { useEffect, useState } from 'react'
import {
  deletePasskey,
  listPasskeys,
  loginOptions,
  loginVerify,
  logout,
  passwordLogin,
  registerOptions,
  registerVerify,
} from './actions'

type Props = { me?: string }
type Passkey = Awaited<ReturnType<typeof listPasskeys>>[number]

export const PasskeyForm = ({ me }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [passkeys, setPasskeys] = useState<Passkey[]>([])

  const run = (action: () => Promise<unknown>, successMessage = '') => {
    return async () => {
      setMessage('')
      try {
        await action()
        setMessage(successMessage)
      } catch (e) {
        setMessage(String(e))
      }
    }
  }

  const loadPasskeys = async () => {
    const list = await listPasskeys()
    setPasskeys(list)
  }

  useEffect(() => {
    if (me) loadPasskeys().catch((e) => setMessage(String(e)))
  }, [me])

  const handlePasswordLogin = run(async () => {
    await passwordLogin(username, password)
  })

  const handleRegister = run(async () => {
    const optionsJSON = await registerOptions()
    const credential = await startRegistration({ optionsJSON })
    await registerVerify(credential)
    await loadPasskeys()
  }, 'passkey registered')

  const handlePasskeyLogin = run(async () => {
    const optionsJSON = await loginOptions(username)
    const credential = await startAuthentication({ optionsJSON })
    await loginVerify(username, credential)
  })

  const handleDelete = (credentialId: string) =>
    run(async () => {
      await deletePasskey(credentialId)
      await loadPasskeys()
    })

  const handleLogout = run(async () => {
    await logout()
  })

  const buttonClass = 'px-4 py-2 rounded bg-white hover:bg-grayer'
  const inputClass = 'block px-3 py-2 rounded bg-white'

  if (me) {
    return (
      <div className='space-y-3'>
        <p>
          logged in as <b>{me}</b>
        </p>
        <div className='space-x-2'>
          <button className={buttonClass} onClick={handleRegister}>
            register passkey
          </button>
          <button className={buttonClass} onClick={handleLogout}>
            logout
          </button>
        </div>
        <ul className='space-y-2'>
          {passkeys.map((passkey) => (
            <li key={passkey.id} className='flex items-center gap-3 px-3 py-2 rounded bg-white'>
              <span>
                {passkey.name || 'passkey'} ({passkey.attachment === 'platform' ? 'この端末' : passkey.attachment})
              </span>
              <span className='text-sm'>{new Date(passkey.createdAt).toLocaleString('ja-JP')}</span>
              <button className='ml-auto text-red-600' onClick={handleDelete(passkey.id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
        {message && <p>{message}</p>}
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <input
        className={inputClass}
        placeholder='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={inputClass}
        type='password'
        placeholder='password (初回のみ)'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='space-x-2'>
        <button className={buttonClass} onClick={handlePasswordLogin} disabled={!username || !password}>
          password login
        </button>
        <button className={buttonClass} onClick={handlePasskeyLogin} disabled={!username}>
          login with passkey
        </button>
      </div>
      {message && <p className='text-red-600'>{message}</p>}
    </div>
  )
}
