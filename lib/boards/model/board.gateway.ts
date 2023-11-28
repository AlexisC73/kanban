export interface BoardGateway {
  getAllBoards: () => Promise<GetAllBoards>
  createBoard: (board: {
    name: string
    columns: string[]
  }) => Promise<CreateBoardResponse>
  getBoardById: (id: string) => Promise<GetBoardByIdResponse>
  updateBoard: (board: {
    id: string
    name: string
    columns: Array<{ id: string; name: string }>
  }) => Promise<void>
}

export type GetAllBoards = Array<{
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    tasks: string[]
    board: string
  }>
}>

export interface CreateBoardResponse {
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    tasks: string[]
    board: string
  }>
}

export interface GetBoardByIdResponse {
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    tasks: string[]
    board: string
  }>
}
