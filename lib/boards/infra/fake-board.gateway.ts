import {
  BoardGateway,
  CreateBoardResponse,
  GetBoardsNameResponse
} from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: { id: string; name: string; columns: string[] }[] = []
  getAllBoards (): Promise<GetBoardsNameResponse> {
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
}
