import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const deleteBoard = createAppAsyncThunk(
  'board/deleteBoard',
  async (id: string, { extra: { boardGateway }, getState }) => {
    const token = getState().auth.token
    if (!token) return null
    await boardGateway.deleteBoard({ id, token })
    return await Promise.resolve(id)
  },
)
