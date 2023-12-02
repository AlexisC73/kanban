import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Column {
  id: string
  name: string
  boardId: string
}

export const columnEntityAdapter = createEntityAdapter<Column>()
