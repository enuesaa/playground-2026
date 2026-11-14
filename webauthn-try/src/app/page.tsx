import { Header } from '../components/common/Header'
import { Main } from '../components/common/Main'
import { PasskeyForm } from '../components/PasskeyForm'
import { getUsername } from '../lib/db'

export default async function TopPage() {
  return (
    <>
      <Header />
      <Main>
        <PasskeyForm me={await getUsername()} />
      </Main>
    </>
  )
}
