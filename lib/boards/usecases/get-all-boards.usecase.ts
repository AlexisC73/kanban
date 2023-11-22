import { createAppAsyncThunk } from '@/lib/create-app-thunk'
import { Board } from '../model/board.entity'

export const getAllBoardsWithoutColums = createAppAsyncThunk(
  'boards/getAllBoardsWithoutColumns',
  async (_, { extra: { boardGateway } }) => {
    const boards = await boardGateway.getAllBoards()
    console.log(boards)
    return boards
  }
)
