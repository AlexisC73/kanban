import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Column {
  id: string
  name: string
  tasks: string[]
}

export const columnEntityAdapter = createEntityAdapter<Column>()
