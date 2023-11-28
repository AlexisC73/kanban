import { createSlice } from '@reduxjs/toolkit'
import { columnEntityAdapter } from '../model/column.entity'
import { createBoard } from '../usecases/add-board.usecase'
import { RootState } from '@/lib/store'

export const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createBoard.fulfilled, (state, action) => {
      columnEntityAdapter.addMany(state, action.payload.columns)
    })
  },
})

export const selectColumns = (state: RootState) => {
  return columnEntityAdapter.getSelectors().selectAll(state.columns)
}

export const selectColumn = (state: RootState, id: string) => {
  return columnEntityAdapter.getSelectors().selectById(state.columns, id)
}

export const selectColumnsWithIds = (state: RootState, ids: string[]) => {
  return columnEntityAdapter
    .getSelectors()
    .selectAll(state.columns)
    .filter((column) => ids.includes(column.id))
}
