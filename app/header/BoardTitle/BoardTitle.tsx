'use client'
import { MenuCtx } from '@/context/menu/MenuCtx'
import { selectBoardTitle } from '@/lib/boards/slices/boards.slice'
import { useAppSelector } from '@/lib/hook'
import { ArrowDownIcon } from '@/presentation/@shared/assets'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

export const BoardTitle = () => {
  const params = useParams()
  const boardId = params?.board as string | undefined
  const { isOpen: isMenuOpen, toggleMenu } = useContext(MenuCtx)

  const boardTitle = useAppSelector(selectBoardTitle(boardId))

  return (
    <div className='text-Heading-L dark:text-white'>
      <div
        onClick={toggleMenu}
        className='md:hidden flex items-center gap-x-2 cursor-pointer'
      >
        <h1>{boardTitle ?? 'Welcome on Kanban App'}</h1>
        <ArrowDownIcon
          className={`text-Main-Purple text-[11px] ${
            isMenuOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <p className='hidden md:block'>{boardTitle ?? 'Welcome on Kanban App'}</p>
    </div>
  )
}
