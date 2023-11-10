'use client'

import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import { ThemeCtx } from '@/context/theme/ThemeCtx'
import { Header } from './header/Header'
import { MobileMenu } from './menu/mobileMenu/MobileMenu'
import { SideMenu } from './menu/sideMenu/SideMenu'
import { MenuCtx } from '@/context/menu/MenuCtx'

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
        <body className={jakarta_sans.className + ' h-screen flex flex-col'}>
          <MenuCtx.Provider value={{ isOpen, setIsOpen, toggleMenu }}>
            <Header />
            <div className='flex flex-1 bg-Light-Grey dark:bg-Very-Dark-Grey'>
              {isOpen && <MobileMenu />}
              <SideMenu />

              {children}
            </div>
          </MenuCtx.Provider>
        </body>
      </html>
    </ThemeCtx.Provider>
  )
}
