import {
  BoardGateway,
  EditBoardResponse,
  GetBoardsResponse,
} from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: Array<{
    id: string
    name: string
    columns: Array<{
      id: string
      name: string
      boardId: string
    }>
  }> = []

  async getBoards(): Promise<GetBoardsResponse> {
    return await Promise.resolve(this.boards)
  }

  async createBoard(board: {
    id: string
    name: string
    columns: Array<{ id: string; name: string }>
  }): Promise<void> {
    const newBoard = {
      ...board,
      columns: [],
    }
    this.boards.push(newBoard)
    await Promise.resolve()
  }

  async editBoard(board: {
    id: string
    name: string
    columns: Array<{
      id: string
      name: string
    }>
  }): Promise<EditBoardResponse> {
    const boardIndex = this.boards.findIndex((b) => b.id === board.id)
    if (boardIndex === -1) {
      throw new Error('Board not found')
    }
    this.boards[boardIndex] = {
      ...this.boards[boardIndex],
      id: board.id,
      name: board.name,
      columns: board.columns.map((c) => ({
        id: c.id,
        name: c.name,
        boardId: board.id,
      })),
    }
    return await Promise.resolve(this.boards[boardIndex])
  }
}
