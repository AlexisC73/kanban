export interface BoardGateway {
  getBoards: () => Promise<GetBoardsResponse>
  createBoard: (board: {
    id: string
    name: string
    columns: Array<{ id: string; name: string }>
  }) => Promise<void>
}

export type GetBoardsResponse = Array<{
  id: string
  name: string
  columns: Array<{
    id: string
    name: string
    tasks: Array<{
      id: string
      name: string
      description: string
      status: string
      subtasks: Array<{ id: string; name: string; completed: boolean }>
    }>
  }>
}>
