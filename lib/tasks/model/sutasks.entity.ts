import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Subtask {
  id: string
  name: string
  taskId: string
  completed: boolean
  boardId: string
}

export const subtasksEntityAdapter = createEntityAdapter<Subtask>()
