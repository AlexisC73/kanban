'use client'
import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const createBoard = createAppAsyncThunk(
  'boards/createBoard',
  async (board: { name: string }, { extra: { boardGateway } }) => {
    const newBoard = await boardGateway.createBoard(board)
    return Promise.resolve(newBoard)
  }
)
