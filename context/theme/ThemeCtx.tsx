import { PropsWithChildren, createContext, useState } from 'react'

export const ThemeCtx = createContext<{
  theme: 'light' | 'dark'
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {}
})

