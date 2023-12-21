import { MenuCtx } from '@/context/menu/MenuCtx'
import { useContext } from 'react'
import { MobileMenu } from './mobileMenu/MobileMenu'
import { SideMenu } from './sideMenu/SideMenu'

export const Menu = () => {
  const { isOpen } = useContext(MenuCtx)
  return (
    <>
      {isOpen && <MobileMenu />}
      <SideMenu />
    </>
  )
}
