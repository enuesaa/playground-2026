import type { PageProps } from '../../pages.gen'

export default function Page({ id }: PageProps<'Memos/Show'>) {
  return (
    <div>
      <h1>id: {id}</h1>
    </div>
  )
}