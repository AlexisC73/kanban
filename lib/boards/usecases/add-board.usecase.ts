import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const createBoard = createAppAsyncThunk(
  'board/createBoard',
  async (
    board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    },
    { extra: { boardGateway } },
  ) => {
    await boardGateway.createBoard(board)
    await Promise.resolve()
  },
)
