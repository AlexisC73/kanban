import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const createBoard = createAppAsyncThunk(
  'board/createBoard',
  async (
    board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    },
    { extra: { boardGateway }, getState },
  ) => {
    const state = getState()
    const token = state.auth.token
    if (!token) return null
    const newBoard = await boardGateway.createBoard({ board, token })
    return await Promise.resolve(newBoard)
  },
)
