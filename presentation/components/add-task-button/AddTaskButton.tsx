'use client'
import { PlusIcon } from '@/presentation/@shared/assets'
import { useParams } from 'next/navigation'

export const AddTaskButton = ({
  disabled = false,
  onClick,
}: {
  disabled?: boolean
  onClick: () => void
}) => {
  const params = useParams()
  const boardId = params.board as string | undefined

  if (!boardId) return null

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className='px-[18px] md:px-6 h-12 bg-Main-Purple rounded-3xl text-white disabled:opacity-25'
    >
      <PlusIcon className='md:hidden' />
      <span className='hidden md:block text-Heading-M'>+ Add New Task</span>
    </button>
  )
}
