export interface BoardGateway {
  getAllBoards(): Promise<GetBoardsWithoutColumnsResponse>
  createBoard(board: { name: string }): Promise<CreateBoardResponse>
  getBoardById(id: string): Promise<GetBoardByIdResponse>
}

export type GetBoardsWithoutColumnsResponse = {
  id: string
  name: string
}[]

export type CreateBoardResponse = {
  id: string
  name: string
  columns: string[]
}

export type GetBoardByIdResponse = {
  id: string
  name: string
  columns: string[]
}
