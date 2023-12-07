import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Subtask {
  id: string
  name: string
  taskId: string
  completed: boolean
}

export const subtasksEntityAdapter = createEntityAdapter<Subtask>()
