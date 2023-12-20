import { BoardWithColumns } from './types'

export interface BoardGateway {
  getBoards: (params: { token: string }) => Promise<GetBoardsResponse>
  createBoard: ({
    board,
    token,
  }: {
    board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    }
    token: string
  }) => Promise<CreateBoardResponse>
  editBoard: ({
    board,
    token,
  }: {
    board: {
      id: string
      name: string
      columns: Array<{
        id: string
        name: string
      }>
    }
    token: string
  }) => Promise<EditBoardResponse>
  deleteBoard: ({ id, token }: { id: string; token: string }) => Promise<void>
}

export type GetBoardsResponse = BoardWithColumns[]

export type CreateBoardResponse = BoardWithColumns

export interface EditBoardResponse {
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    boardId: string
  }>
}
