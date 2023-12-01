import { BoardGateway, GetBoardsResponse } from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: Array<{
    id: string
    name: string
    columns: Array<{
      id: string
      name: string
      tasks: Array<{
        id: string
        name: string
        description: string
        status: string
        subtasks: Array<{ id: string; name: string; completed: boolean }>
      }>
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
}
