'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/theme/ThemeCtx'
import { Providers } from '@/lib/provider'

const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <ThemeProvider>
        <body
          suppressHydrationWarning={true}
          className={
            jakartaSans.className +
            ' h-screen flex flex-col bg-Light-Grey dark:bg-Very-Dark-Grey'
          }
        >
          {children}
        </body>
      </ThemeProvider>
    </Providers>
  )
}
