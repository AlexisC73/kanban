export interface BoardGateway {
  getAllBoards: () => Promise<GetBoardsWithoutColumnsResponse>
  createBoard: (board: {
    name: string
    columns: string[]
  }) => Promise<CreateBoardResponse>
  getBoardById: (id: string) => Promise<GetBoardByIdResponse>
}

export type GetBoardsWithoutColumnsResponse = Array<{
  id: string
  name: string
}>

export interface CreateBoardResponse {
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    tasks: string[]
  }>
}

export interface GetBoardByIdResponse {
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    tasks: string[]
  }>
}
