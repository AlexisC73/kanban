import { MenuCtx } from '@/context/menu/MenuCtx'
import { useContext } from 'react'
import { MobileMenu } from './mobileMenu/MobileMenu'
import { SideMenu } from './sideMenu/SideMenu'
import { useAppSelector } from '@/lib/hook'
import { selectAllBoards } from '@/lib/boards/slices/boards.slice'

export const Menu = ({ currentBoardId }: { currentBoardId: string }) => {
  const boards = useAppSelector(selectAllBoards)
  console.log('boards', boards)
  const { isOpen } = useContext(MenuCtx)
  return (
    <>
      {isOpen && <MobileMenu boards={boards} currentBoardId={currentBoardId} />}
      <SideMenu boards={boards} currentBoardId={currentBoardId} />
    </>
  )
}
