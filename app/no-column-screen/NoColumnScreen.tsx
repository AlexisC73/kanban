import { BoardActionsCtx } from '@/context/boardActions/BoardActions'
import { useContext } from 'react'

export const NoColumnScreen = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-y-6 px-4 md:px-16 text-center'>
      <p className='text-Heading-L text-Medium-Grey'>
        This board is empty. Create a new column to get started.
      </p>
      <AddColumnIcon />
    </div>
  )
}

export const AddColumnIcon = () => {
  const { setShowEditBoardModal } = useContext(BoardActionsCtx)
  const handleClick = () => {
    setShowEditBoardModal(true)
  }
  return (
    <button
      onClick={handleClick}
      className='flex h-12 px-[18px] text-Heading-M text-white justify-center items-center bg-Main-Purple rounded-3xl'
    >
      + Add New Column
    </button>
  )
}
