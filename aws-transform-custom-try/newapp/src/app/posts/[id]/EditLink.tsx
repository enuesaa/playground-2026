'use client'

import { ArrowBigRightDash } from 'lucide-react'
import Link from 'next/link'

interface EditLinkProps {
  id: number
}

export default function EditLink({ id }: EditLinkProps) {
  return (
    <Link href={`/posts/${id}/edit`} className="font-zenkaku block w-fit mx-3 my-3">
      <ArrowBigRightDash className="inline w-4" />
      <span className="inline-block border-b-2 border-dotted hover:border-dashed">Edit</span>
    </Link>
  )
}
