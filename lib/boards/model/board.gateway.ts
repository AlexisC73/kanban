export interface BoardGateway {
  getAllBoardsName(): Promise<GetBoardsNameResponse>
}

export type GetBoardsNameResponse = { id: string; name: string }[]
