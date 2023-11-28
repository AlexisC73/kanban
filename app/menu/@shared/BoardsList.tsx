import { BoardLi } from './BoardLi'
import { Board } from '@/lib/boards/model/board.entity'
import { CreateNewBoardButton } from './CreateNewBoardButton'

export interface BoardsListProps {
  boards: Board[]
  currentBoardId: string
}

export const BoardsList = ({
  boards = [],
  currentBoardId,
}: BoardsListProps) => {
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
              active={currentBoardId === board.id}
            />
          ))}
        </ul>
        <CreateNewBoardButton />
      </div>
    </div>
  )
}
