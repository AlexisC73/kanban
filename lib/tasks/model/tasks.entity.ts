import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Task {
  id: string
  name: string
  description: string
  columnId: string
  boardId: string
  subtasks: string[]
}

export const tasksEntityAdapter = createEntityAdapter<Task>()
