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
    { extra: { boardGateway }, getState },
  ) => {
    const state = getState()
    const token = state.auth.token
    if (!token) {
      return null
    }
    const editedBoard = await boardGateway.editBoard({ board, token })
    return await Promise.resolve(editedBoard)
  },
)
