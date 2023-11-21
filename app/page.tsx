'use client'

import { selectAllBoards } from '@/lib/boards/slices/boards.slice'
import { createBoard } from '@/lib/boards/usecases/add-board.usecase'
import { getAllBoards } from '@/lib/boards/usecases/get-all-boards.usecase'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home () {
  const { push } = useRouter()

  const [initializing, setInitializing] = useState(true)

  const dispatch = useAppDispatch()
  const boards = useAppSelector(selectAllBoards)

  useEffect(() => {
    const getBoards = dispatch(getAllBoards())

    getBoards.finally(() => {
      setInitializing(false)
    })

    return () => {
      getBoards.abort()
    }
  }, [])

  useEffect(() => {
    if (initializing) return
    if (boards.length > 0) {
      push(`/board/${boards[0].id}`)
    }
    if (boards.length <= 0) {
      const { abort } = dispatch(createBoard({ name: 'Mon premier board' }))
      return () => {
        abort()
      }
    }
  }, [boards, initializing])

  return <main className='flex gap-x-6 p-4 py-6 md:px-6'></main>
}
