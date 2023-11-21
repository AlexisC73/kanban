'use client'
import { ReactNode, createContext, useEffect, useState } from 'react'

export const ThemeCtx = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const toggleTheme = () =>
    setTheme(prev => {
      localStorage.setItem('theme', prev === 'light' ? 'dark' : 'light')
      return prev === 'light' ? 'dark' : 'light'
    })

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme as 'light' | 'dark')
    }
  }, [])

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      <html lang='en' className={theme}>
        {children}
      </html>
    </ThemeCtx.Provider>
  )
}
