'use client'

import { BoardActionsCtx } from '@/context/boardActions/BoardActions'
import { selectBoards } from '@/lib/boards/slices/boards.slice'
import { useAppSelector } from '@/lib/hook'
import { redirect } from 'next/navigation'
import { useContext } from 'react'

export default function BoardPage() {
  const boards = useAppSelector(selectBoards)
  const { setShowAddBoardModal } = useContext(BoardActionsCtx)

  if (boards.length !== 0) {
    redirect(`board/${boards[0].id}`)
  }
  return (
    <div className='flex flex-col gap-y-4 w-full items-center justify-center'>
      <p className='text-Heading-M text-Dark-Grey dark:text-white'>
        You don&apos;t have any board yet.
      </p>
      <button
        onClick={() => {
          setShowAddBoardModal(true)
        }}
        className='flex h-12 px-[18px] text-Heading-M text-white justify-center items-center bg-Main-Purple rounded-3xl'
      >
        + Create my first Board
      </button>
    </div>
  )
}
