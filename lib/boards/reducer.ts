import { combineReducers } from '@reduxjs/toolkit'
import { boardsSlice } from './slices/boards.slice'
import { columnsSlice } from './slices/columns.slice'
import { tasksSlice } from './slices/tasks.slice'
import { subtasksSlice } from './slices/subtasks.slice'

export const boardReducer = combineReducers({
  [boardsSlice.name]: boardsSlice.reducer,
  [columnsSlice.name]: columnsSlice.reducer,
  [tasksSlice.name]: tasksSlice.reducer,
  [subtasksSlice.name]: subtasksSlice.reducer,
})
