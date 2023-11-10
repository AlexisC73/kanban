import { PropsWithChildren, createContext, useState } from 'react'

export const MenuCtx = createContext<{
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleMenu: () => void
}>({
  isOpen: true,
  setIsOpen: isOpen => {},
  toggleMenu: () => {}
})
