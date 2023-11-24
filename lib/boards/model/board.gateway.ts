import { Board } from './board.entity'

export interface BoardGateway {
  getAllBoards: () => Promise<GetBoardsWithoutColumnsResponse>
  createBoard: (board: { name: string }) => Promise<CreateBoardResponse>
  getBoardById: (id: string) => Promise<GetBoardByIdResponse>
}

export type GetBoardsWithoutColumnsResponse = Array<{
  id: string
  name: string
}>

export type CreateBoardResponse = Board

export type GetBoardByIdResponse = Board
