import { cookies } from 'next/headers'
import { PasskeyForm } from './PasskeyForm'

export default async function TopPage() {
  const cookieStore = await cookies()
  const username = cookieStore.get('username')?.value

  return (
    <>
      <header className='w-full container mx-auto text-2xl font-semibold'>testsite</header>
      <main className='w-full mx-auto container py-5'>
        <PasskeyForm me={username} />
      </main>
    </>
  )
}
