'use client'
import { NoColumnScreen } from '@/app/no-column-screen/NoColumnScreen'
import { selectBoardById } from '@/lib/boards/slices/boards.slice'
import { getBoardById } from '@/lib/boards/usecases/get-board-by-id.usecase'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import ColumList, {
  ColumnListProps
} from '@/presentation/components/ColumnList/ColumnList'
import { BoardModal } from '@/presentation/components/board-modal/BoardModal'
import { useParams, redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BoardPage () {
  const { board: boardId }: { board: string } = useParams()
  const [initializing, setInitializing] = useState(true)

  const dispatch = useAppDispatch()

  const board = useAppSelector(state => selectBoardById(state, boardId))

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
    columns: []
  }

  if (initializing) return <div>loading...</div>

  return (
    <main className='flex w-full'>
      {board.columns.length <= 0 ? (
        <NoColumnScreen />
      ) : (
        <ColumList board={boardData} />
      )}
      <BoardModal
        defaultBoard={{
          id: boardData.id,
          name: boardData.name,
          columns: boardData.columns.map(c => ({ id: c.id, name: c.title }))
        }}
        isEdit
        closeModal={() => {
          console.log('close modal')
        }}
        onSubmit={async () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, 2000)
          })
        }}
      />
    </main>
  )
}
