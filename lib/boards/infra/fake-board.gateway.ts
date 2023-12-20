import {
  BoardGateway,
  EditBoardResponse,
  GetBoardsResponse,
} from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: Array<{
    id: string
    name: string
    owner: string
    columns: Array<{
      id: string
      name: string
      boardId: string
    }>
  }> = []

  async getBoards({ token }: { token: string }): Promise<GetBoardsResponse> {
    const user = JSON.parse(token) as { id: string }
    return await Promise.resolve(this.boards.filter((b) => b.owner === user.id))
  }

  async createBoard({
    board,
    token,
  }: {
    board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    }
    token: string
  }) {
    const user = JSON.parse(token) as { id: string }
    const newBoard = {
      id: board.id,
      name: board.name,
      owner: user.id,
      columns: board.columns.map((c) => ({
        id: c.id,
        name: c.name,
        boardId: board.id,
      })),
    }
    this.boards.push(newBoard)
    return await Promise.resolve(newBoard)
  }

  async editBoard({
    board,
    token,
  }: {
    board: {
      id: string
      name: string
      columns: Array<{
        id: string
        name: string
      }>
    }
    token: string
  }): Promise<EditBoardResponse> {
    const user = JSON.parse(token) as { id: string }
    const boardIndex = this.boards.findIndex(
      (b) => b.id === board.id && b.owner === user.id,
    )
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

  async deleteBoard({
    id,
    token,
  }: {
    id: string
    token: string
  }): Promise<void> {
    const user = JSON.parse(token) as { id: string }
    this.boards = this.boards.filter((b) => b.owner !== user.id && b.id !== id)
  }
}
