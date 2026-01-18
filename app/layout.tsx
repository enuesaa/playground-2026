import type { Metadata } from 'next'
import { Geist, Geist_Mono, M_PLUS_Rounded_1c } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const popRounded = M_PLUS_Rounded_1c({
  variable: '--font-pop',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'cardloof',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ja'>
      <body className={`${geistSans.variable} ${popRounded.variable} antialiased`}>{children}</body>
    </html>
  )
}
