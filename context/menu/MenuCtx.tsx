'use client'
import { ReactNode, createContext, useState } from 'react'

export const MenuCtx = createContext<{
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleMenu: () => void
}>({
  isOpen: true,
  setIsOpen: (isOpen) => {},
  toggleMenu: () => {},
})

export const MenuCtxProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <MenuCtx.Provider value={{ isOpen, setIsOpen, toggleMenu }}>
      {children}
    </MenuCtx.Provider>
  )
}
