'use client'

import { startAuthentication, startRegistration } from '@simplewebauthn/browser'
import { useState } from 'react'
import { loginOptions, loginVerify, logout, registerOptions, registerVerify } from '../app/actions'

type Props = { me?: string }

export const PasskeyForm = ({ me }: Props) => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const run = (fn: () => Promise<unknown>) => async () => {
    setError('')
    try {
      await fn()
    } catch (e) {
      setError(String(e))
    }
  }

  const register = run(async () =>
    registerVerify(username, await startRegistration({ optionsJSON: await registerOptions(username) })),
  )
  const login = run(async () => loginVerify(await startAuthentication({ optionsJSON: await loginOptions() })))

  const btn = 'px-4 py-2 rounded bg-white hover:bg-grayer'

  if (me) {
    return (
      <div className='space-y-3'>
        <p>logged in as <b>{me}</b></p>
        <button className={btn} onClick={run(logout)}>logout</button>
      </div>
    )
  }

  return (
    <div className='space-y-3'>
      <input
        className='block px-3 py-2 rounded bg-white'
        placeholder='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className='space-x-2'>
        <button className={btn} onClick={register} disabled={!username}>register</button>
        <button className={btn} onClick={login}>login with passkey</button>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}