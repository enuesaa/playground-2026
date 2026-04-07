import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import Header from './components/Header'

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
        <Providers>
          <Header />
          <main className="container mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
