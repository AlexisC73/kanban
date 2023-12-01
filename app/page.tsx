'use client'

import { selectBoards } from '@/lib/boards/slices/boards.slice'
import { useAppSelector } from '@/lib/hook'
import { AddBoardModal } from '@/presentation/components/add-board-modal/AddBoardModal'
import { redirect } from 'next/navigation'

export default function Home() {
  const boards = useAppSelector(selectBoards)

  if (boards.length !== 0) {
    redirect('/board/' + boards[0].id)
  }
  return (
    <main className='flex gap-x-6 p-4 py-6 md:px-6'>
      <AddBoardModal />
    </main>
  )
}
