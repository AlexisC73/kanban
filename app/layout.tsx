'use client'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import { ThemeCtx } from '@/context/theme/ThemeCtx'

const jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme: () => void = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      <html lang='en' className={theme}>
        <body className={jakarta_sans.className}>{children}</body>
      </html>
    </ThemeCtx.Provider>
  )
}
