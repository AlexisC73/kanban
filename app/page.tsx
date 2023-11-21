'use client'

import { selectAllBoards } from '@/lib/boards/slices/boards.slice'
import { getAllBoardsName } from '@/lib/boards/usecases/get-all-boards.usecase'
import { useAppDispatch } from '@/lib/store'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Home () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllBoardsName())
  }, [])

  const boards = useSelector(selectAllBoards)

  if (!!boards && boards.length > 0) {
    redirect(`/board/${boards[0].id}`)
  }
  return <main className='flex gap-x-6 p-4 py-6 md:px-6'></main>
}
