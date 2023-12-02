export interface BoardGateway {
  getBoards: () => Promise<GetBoardsResponse>
  createBoard: (board: {
    id: string
    name: string
    columns: Array<{ id: string; name: string }>
  }) => Promise<void>
  editBoard: (board: {
    id: string
    name: string
    columns: Array<{
      id: string
      name: string
    }>
  }) => Promise<EditBoardResponse>
}

export type GetBoardsResponse = Array<{
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    boardId: string
  }>
}>

export interface EditBoardResponse {
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    boardId: string
  }>
}
