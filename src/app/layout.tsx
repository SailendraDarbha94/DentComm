import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { classNames } from '@/lib/utils'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SmartBag',
  description: 'AI service that allows you to organise and sort your digital life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
        <body
          className={classNames(
            'min-h-screen font-sans antialiased grainy',
            inter.className
          )}>
          {/* <Toaster />*/}
          <Navbar />
          {children}
        </body>
    </html>
  )
}
