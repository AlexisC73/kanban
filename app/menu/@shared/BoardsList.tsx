'use client'
import { BoardLi } from './BoardLi'
import { CreateNewBoardButton } from './CreateNewBoardButton'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/lib/hook'
import { selectBoards } from '@/lib/boards/slices/boards.slice'

export const BoardsList = () => {
  const params = useParams()
  const boardId = params?.board as string | undefined
  const boards = useAppSelector(selectBoards)

  return (
    <div>
      <h2 className='text-Heading-S uppercase text-Medium-Grey px-6 pb-4'>
        All Boards ({boards.length})
      </h2>
      <div>
        <ul className='pr-6'>
          {boards.map((board) => (
            <BoardLi
              label={board.name}
              key={board.id}
              boardId={board.id}
              active={!boardId ? false : boardId === board.id}
            />
          ))}
        </ul>
        <CreateNewBoardButton />
      </div>
    </div>
  )
}
