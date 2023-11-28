'use client'
import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const updateBoard = createAppAsyncThunk(
  'boards/updateBoard',
  async (
    board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    },
    { extra: { boardGateway } },
  ) => {
    await boardGateway.updateBoard(board)
    return await Promise.resolve(board)
  },
)
