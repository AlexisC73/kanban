import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Board {
  id: string
  name: string
  columns: string[]
}

export const boardEntityAdapter = createEntityAdapter<Board>()
