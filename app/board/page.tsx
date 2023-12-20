'use client'

import { selectBoards } from '@/lib/boards/slices/boards.slice'
import { useAppSelector } from '@/lib/hook'
import { AddBoardModal } from '@/presentation/components/add-board-modal/AddBoardModal'
import { redirect } from 'next/navigation'

export default function BoardPage() {
  const boards = useAppSelector(selectBoards)

  if (boards.length !== 0) {
    redirect(`board/${boards[0].id}`)
  }
  return <AddBoardModal />
}
