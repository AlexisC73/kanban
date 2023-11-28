import {
  BoardGateway,
  CreateBoardResponse,
  GetBoardByIdResponse,
  GetAllBoards,
} from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: Array<{
    id: string
    name: string
    columns: Array<{ id: string; name: string; tasks: string[]; board: string }>
  }> = []

  async getAllBoards(): Promise<GetAllBoards> {
    return await Promise.resolve(
      this.boards.map((b) => ({ id: b.id, name: b.name, columns: b.columns })),
    )
  }

  async createBoard(board: {
    name: string
    columns: string[]
  }): Promise<CreateBoardResponse> {
    const newBoardId = Math.floor(Math.random() * 10000).toString()
    const newBoard = {
      id: newBoardId,
      name: board.name,
      columns: board.columns.map((c) => ({
        id: `id_${c}`,
        name: c,
        tasks: [],
        board: newBoardId,
      })),
    }
    this.boards = [...this.boards, newBoard]
    return await Promise.resolve(newBoard)
  }

  async updateBoard(board: {
    id: string
    name: string
    columns: Array<{ id: string; name: string }>
  }) {
    const boardIndex = this.boards.findIndex((b) => b.id === board.id)
    this.boards[boardIndex] = {
      ...this.boards[boardIndex],
      name: board.name,
      columns: board.columns.map((c) => ({
        id: c.id,
        name: c.name,
        tasks: [],
        board: board.id,
      })),
    }
  }

  async getBoardById(id: string): Promise<GetBoardByIdResponse> {
    const board = this.boards.find((b) => b.id === id)
    if (!board) throw new Error('Board not found')
    return await Promise.resolve(board)
  }
}
