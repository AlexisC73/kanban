import { combineReducers } from '@reduxjs/toolkit'
import { boardsSlice } from './slices/boards.slice'
import { columnsSlice } from './slices/column.slice'

export const reducer = combineReducers({
  [boardsSlice.name]: boardsSlice.reducer,
  [columnsSlice.name]: columnsSlice.reducer,
})
