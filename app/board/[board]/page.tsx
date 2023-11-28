'use client'
import { NoColumnScreen } from '@/app/no-column-screen/NoColumnScreen'
import { selectBoard } from '@/lib/boards/slices/boards.slice'
import { getBoardById } from '@/lib/boards/usecases/get-board-by-id.usecase'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import ColumList, {
  type ColumnListProps,
} from '@/presentation/components/ColumnList/ColumnList'
import { useParams, redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BoardPage() {
  const { board: boardId }: { board: string } = useParams()
  const [initializing, setInitializing] = useState(true)

  const dispatch = useAppDispatch()

  const board = useAppSelector((state) => selectBoard(state, boardId))

  useEffect(() => {
    const result = dispatch(getBoardById(boardId))

    result.finally(() => {
      setInitializing(false)
    })

    return () => {
      result.abort()
    }
  }, [dispatch, boardId])

  if (!board) {
    redirect('/')
  }

  const boardData: ColumnListProps['board'] = {
    id: board.id,
    name: board.name,
    columns: [],
  }

  if (initializing) return <div>loading...</div>

  return (
    <main className='flex w-full'>
      {board.columns.length <= 0 ? (
        <NoColumnScreen />
      ) : (
        <ColumList board={boardData} />
      )}
    </main>
  )
}
