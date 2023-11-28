import { BoardActionsCtx } from '@/context/boardActions/BoardActions'
import { BoardLogo } from '@/presentation/@shared/assets'
import { useContext } from 'react'

export const CreateNewBoardButton = () => {
  const { setShowAddBoardModal } = useContext(BoardActionsCtx)
  const handleClick = () => {
    setShowAddBoardModal(true)
  }
  return (
    <button
      onClick={handleClick}
      className='flex items-center gap-x-3 pl-6 h-12 text-Main-Purple'
    >
      <BoardLogo />
      <span className='text-Heading-M'>+ Create New Board</span>
    </button>
  )
}
