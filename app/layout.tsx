'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import { ThemeProvider } from '@/context/theme/ThemeCtx'
import { Header } from './header/Header'
import { MenuCtx, MenuCtxProvider } from '@/context/menu/MenuCtx'
import { Menu } from './menu/Menu'
import { Providers } from '@/lib/provider'
import { WithMenuLayout } from './layout/withMenuLayout'

const jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <ThemeProvider>
        <body
          suppressHydrationWarning={true}
          className={
            jakarta_sans.className +
            ' h-screen flex flex-col bg-Light-Grey dark:bg-Very-Dark-Grey'
          }
        >
          <MenuCtxProvider>
            <WithMenuLayout>{children}</WithMenuLayout>
          </MenuCtxProvider>
        </body>
      </ThemeProvider>
    </Providers>
  )
}
