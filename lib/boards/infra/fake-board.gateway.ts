import { BoardGateway, GetBoardsNameResponse } from '../model/board.gateway'

export class FakeBoardGateway implements BoardGateway {
  boards: { id: string; name: string }[] = []
  getAllBoardsName (): Promise<GetBoardsNameResponse> {
    return Promise.resolve(this.boards)
  }
}

export const fakeBoardGateway = new FakeBoardGateway()
