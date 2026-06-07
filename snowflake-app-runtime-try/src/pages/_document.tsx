import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='ja'>
      <Head />
      <body className='text-blac bg-gray-200 font-zenkaku'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
