'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import { ThemeCtx } from '@/context/theme/ThemeCtx'
import { Header } from './header/Header'
import { MenuCtx } from '@/context/menu/MenuCtx'
import { Menu } from './menu/Menu'

const jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme: () => void = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(prev => !prev)
  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      <html lang='en' className={theme}>
        <body
          suppressHydrationWarning={true}
          className={
            jakarta_sans.className +
            ' h-screen flex flex-col bg-Light-Grey dark:bg-Very-Dark-Grey'
          }
        >
          <MenuCtx.Provider value={{ isOpen, setIsOpen, toggleMenu }}>
            <Header />
            <Menu />
            <div
              className={`flex mt-16 overflow-y-scroll h-full ${
                isOpen ? 'md:ml-[260px] lg:ml-[300px]' : ''
              }`}
            >
              {children}
            </div>
          </MenuCtx.Provider>
        </body>
      </html>
    </ThemeCtx.Provider>
  )
}
