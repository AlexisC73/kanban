import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const getBoards = createAppAsyncThunk(
  'boards/getBoards',
  async (_, { extra: { boardGateway } }) => {
    const boards = await boardGateway.getBoards()
    return boards
  },
)
