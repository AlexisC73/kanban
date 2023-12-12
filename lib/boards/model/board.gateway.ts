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
  deleteBoard: (board: { id: string }) => Promise<void>
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
