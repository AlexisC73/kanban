import { ThemeSwitcher } from '@/presentation/components/ThemeSwitcher/ThemeSwitcher'
import { BoardsList } from '../@shared/BoardsList'
import { useContext } from 'react'
import { MenuCtx } from '@/context/menu/MenuCtx'
import { Board } from '@/lib/boards/model/board.entity'

export interface MobileMenuProps {
  boards: Board[]
  currentBoardId: string
}

export const MobileMenu = ({ boards, currentBoardId }: MobileMenuProps) => {
  const { isOpen: isMenuOpen, setIsOpen } = useContext(MenuCtx)
  const blurMenu = () => {
    setIsOpen(false)
  }
  return (
    <div
      onClick={blurMenu}
      className={`md:hidden inset-0 top-16 bg-Black bg-opacity-50 ${
        isMenuOpen ? 'fixed' : 'hidden'
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className='bg-white dark:bg-Dark-Grey w-[264px] mx-auto mt-4 py-4 rounded-lg'
      >
        <BoardsList boards={boards} currentBoardId={currentBoardId} />
        <div className='mt-4 mx-[13px] rounded-[6px] overflow-hidden'>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
