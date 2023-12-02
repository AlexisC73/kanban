import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Task {
  id: string
  name: string
  description: string
  statusId: string
  subtasks: string[]
  boardId: string
}

export const taskEntityAdapter = createEntityAdapter<Task>()
