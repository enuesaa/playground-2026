import { PasskeyForm } from './PasskeyForm'
import { getUsername } from '../lib/db'

export default async function TopPage() {
  return (
    <>
      <header className='w-full container mx-auto text-2xl font-semibold'>
        testsite
      </header>
      <main className='w-full mx-auto container py-5'>
        <PasskeyForm me={await getUsername()} />
      </main>
    </>
  )
}
