import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const getAllBoardsWithoutColums = createAppAsyncThunk(
  'boards/getAllBoardsWithoutColumns',
  async (_, { extra: { boardGateway } }) => {
    const boards = await boardGateway.getAllBoards()
    return boards
  }
)
