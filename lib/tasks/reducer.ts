import { subtasksSlice } from './slices/subtasks.slice'
import { tasksSlice } from './slices/tasks.slice'

export const taskReducer = {
  [tasksSlice.name]: tasksSlice.reducer,
  [subtasksSlice.name]: subtasksSlice.reducer,
}
