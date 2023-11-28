'use client'

import { selectBoards } from '@/lib/boards/slices/boards.slice'
import { createBoard } from '@/lib/boards/usecases/add-board.usecase'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { push } = useRouter()

  const dispatch = useAppDispatch()
  const boards = useAppSelector(selectBoards)

  useEffect(() => {
    if (boards.length > 0) {
      push(`/board/${boards[0].id}`)
    }
    if (boards.length <= 0) {
      const { abort } = dispatch(
        createBoard({ name: 'Mon premier board', columns: [] }),
      )
      return () => {
        abort()
      }
    }
  }, [boards, dispatch, push])

  return <main className='flex gap-x-6 p-4 py-6 md:px-6'></main>
}
