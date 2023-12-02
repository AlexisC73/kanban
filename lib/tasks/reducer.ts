import { tasksSlice } from './slices/tasks.slice'
import { subtasksSlice } from './slices/subtasks.slice'

export const taskReducer = {
  [tasksSlice.name]: tasksSlice.reducer,
  [subtasksSlice.name]: subtasksSlice.reducer,
}
