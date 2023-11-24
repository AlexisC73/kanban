import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const getBoardById = createAppAsyncThunk(
  'boards/getBoardById',
  async (id: string, { extra: { boardGateway } }) => {
    const board = await boardGateway.getBoardById(id)
    return await Promise.resolve(board)
  },
)
