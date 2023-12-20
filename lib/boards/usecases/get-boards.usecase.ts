import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const getBoards = createAppAsyncThunk(
  'boards/getBoards',
  async (_, { extra: { boardGateway }, getState }) => {
    const state = getState()
    const token = state.auth.token
    if (!token) return []
    const boards = await boardGateway.getBoards({ token })
    return boards
  },
)
