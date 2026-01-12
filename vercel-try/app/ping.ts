'use server'

export async function ping() {
  const res = await fetch('https://api.ipify.org?format=json', {
    cache: 'no-store',
  })
  const data = await res.json()

  return {
    ok: true,
    time: new Date().toISOString(),
    ipAddress: data.ip,
  }
}
