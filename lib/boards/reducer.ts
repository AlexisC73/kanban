import { boardsSlice } from './slices/boards.slice'
import { columnsSlice } from './slices/columns.slice'

export const boardReducer = {
  [boardsSlice.name]: boardsSlice.reducer,
  [columnsSlice.name]: columnsSlice.reducer,
}
