import { BoardGateway, GetBoardsNameResponse } from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boardsName!: string[]
  getAllBoardsName (): Promise<GetBoardsNameResponse> {
    return Promise.resolve(this.boardsName)
  }
}

export const fakeBoardGateway = new FakeBoardGateway()
