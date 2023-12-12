import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const deleteBoard = createAppAsyncThunk(
  'board/deleteBoard',
  async (id: string, { extra: { boardGateway } }) => {
    await boardGateway.deleteBoard({ id })
    await Promise.resolve()
  },
)
