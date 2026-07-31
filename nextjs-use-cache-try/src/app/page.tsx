import { Header } from '../components/common/Header'
import { Main } from '../components/common/Main'
import { getUsers } from '../lib/users'

export default async function TopPage() {
  const users = await getUsers()

  return (
    <>
      <Header />
      <Main>a</Main>
      <div>count: {users.total}</div>
    </>
  )
}
