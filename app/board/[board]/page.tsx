'use client'

import { NoColumnScreen } from '@/app/no-column-screen/NoColumnScreen'
import { useAppSelector } from '@/lib/hook'
import ColumList from '@/presentation/components/ColumnList/ColumnList'
import { redirect, useParams } from 'next/navigation'
import { ReactNode } from 'react'
import { BoardViewModelType, selectBoardViewModel } from './board.viewmodel'

export default function BoardPage() {
  const { board: boardId }: { board: string } = useParams()

  const boardViewModel = useAppSelector((state) =>
    selectBoardViewModel(state, boardId),
  )

  const boardNode: ReactNode = (() => {
    switch (boardViewModel.board.type) {
      case BoardViewModelType.NO_BOARD:
        return redirect('/')
      case BoardViewModelType.EMPTY_BOARD:
        return <NoColumnScreen />
      case BoardViewModelType.BOARD_WITH_COLUMNS:
        return <ColumList board={boardViewModel.board.data} />
      default:
        return null
    }
  })()

  return <main className='flex w-full'>{boardNode}</main>
}
