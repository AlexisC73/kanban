import { Board } from '../model/board.entity'
import {
  BoardGateway,
  CreateBoardResponse,
  GetBoardByIdResponse,
  GetBoardsWithoutColumnsResponse
} from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: Board[] = []
  getAllBoards (): Promise<GetBoardsWithoutColumnsResponse> {
    return Promise.resolve(this.boards)
  }

  createBoard (board: { name: string }): Promise<CreateBoardResponse> {
    const newBoard = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: board.name,
      columns: []
    }
    this.boards = [...this.boards, newBoard]
    return Promise.resolve(newBoard)
  }

  getBoardById (id: string): Promise<GetBoardByIdResponse> {
    const board = this.boards.find(b => b.id === id)
    if (!board) throw new Error('Board not found')
    return Promise.resolve(board)
  }
}
