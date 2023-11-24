import { Board } from '../model/board.entity'
import {
  BoardGateway,
  CreateBoardResponse,
  GetBoardByIdResponse,
  GetBoardsWithoutColumnsResponse,
} from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: Board[] = []
  async getAllBoards(): Promise<GetBoardsWithoutColumnsResponse> {
    return await Promise.resolve(
      this.boards.map((b) => ({ id: b.id, name: b.name })),
    )
  }

  async createBoard(board: { name: string }): Promise<CreateBoardResponse> {
    const newBoard = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: board.name,
      columns: [],
    }
    this.boards = [...this.boards, newBoard]
    return await Promise.resolve(newBoard)
  }

  async getBoardById(id: string): Promise<GetBoardByIdResponse> {
    const board = this.boards.find((b) => b.id === id)
    if (!board) throw new Error('Board not found')
    return await Promise.resolve(board)
  }
}
