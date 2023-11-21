export interface BoardGateway {
  getAllBoardsName(): Promise<GetBoardsNameResponse>
}

export type GetBoardsNameResponse = string[]
