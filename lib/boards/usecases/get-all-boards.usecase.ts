import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const getAllBoards = createAppAsyncThunk(
  'boards/getAllBoards',
  async (_, { extra: { boardGateway } }) => {
    const boards = await boardGateway.getAllBoards()
    return boards
  }
)
