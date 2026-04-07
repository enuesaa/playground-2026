import { Cloud } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="container mx-auto pt-2 pb-4 mb-4">
      <Link href="/" className="inline-block">
        <h1 className="font-zenkaku text-2xl font-bold px-2">
          my-svelte-template <Cloud className="inline" />
        </h1>
      </Link>
    </header>
  )
}
