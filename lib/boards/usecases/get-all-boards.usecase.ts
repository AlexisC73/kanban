import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const getAllBoardsName = createAppAsyncThunk(
  'boards/getAllBoards',
  async (_, { extra: { boardGateway } }) => {
    const boards = await boardGateway.getAllBoardsName()
    return boards
  }
)
