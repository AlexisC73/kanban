import { ReactNode, useContext } from 'react'
import { Header } from '../../header/Header'
import { Menu } from '../../menu/Menu'
import { MenuCtx } from '@/context/menu/MenuCtx'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/lib/hook'
import { selectBoardById } from '@/lib/boards/slices/boards.slice'

export const WithMenuLayout = ({ children }: { children: ReactNode }) => {
  const { board: boardId }: { board: string } = useParams()
  const { isOpen } = useContext(MenuCtx)
  const board = useAppSelector((state) => selectBoardById(state, boardId))
  return (
    <>
      <Header
        columnLength={board?.columns.length ?? 0}
        currentBoardName={board?.name ?? 'Kanban App'}
      />
      <Menu currentBoardId={boardId} />
      <div
        className={`flex mt-16 overflow-y-scroll h-full ${
          isOpen ? 'md:ml-[260px] lg:ml-[300px]' : ''
        }`}
      >
        {children}
      </div>
    </>
  )
}
