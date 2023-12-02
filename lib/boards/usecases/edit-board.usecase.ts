import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const editBoard = createAppAsyncThunk(
  'boards/editBoard',
  async (
    board: {
      id: string
      name: string
      columns: Array<{
        id: string
        name: string
      }>
    },
    { extra: { boardGateway } },
  ) => {
    const editedBoard = await boardGateway.editBoard(board)
    return await Promise.resolve(editedBoard)
  },
)
