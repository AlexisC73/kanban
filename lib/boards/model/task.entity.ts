import { createEntityAdapter } from '@reduxjs/toolkit'

export interface Task {
  id: string
  name: string
  description: string
  status: string
  subtasks: string[]
}

export const taskEntityAdapter = createEntityAdapter<Task>()
