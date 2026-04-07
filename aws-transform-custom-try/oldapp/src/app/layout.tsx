import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'my-svelte-template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray text-black">
        {children}
      </body>
    </html>
  )
}
