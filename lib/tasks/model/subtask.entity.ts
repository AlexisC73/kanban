import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Subtask {
  id: string
  name: string
  completed: boolean
}

export const subtaskEntityAdapter = createEntityAdapter<Subtask>()
