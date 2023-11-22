export interface BoardGateway {
  getAllBoards(): Promise<GetBoardsNameResponse>
  createBoard(board: { name: string }): Promise<CreateBoardResponse>
}

export type GetBoardsNameResponse = {
  id: string
  name: string
  columns: string[]
}[]
export type CreateBoardResponse = {
  id: string
  name: string
  columns: string[]
}
