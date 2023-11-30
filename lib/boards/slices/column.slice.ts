import { createSelector, createSlice } from '@reduxjs/toolkit'
import { columnEntityAdapter } from '../model/column.entity'
import { createBoard } from '../usecases/add-board.usecase'
import { RootState } from '@/lib/store'
import { updateBoard } from '../usecases/update-board.usecase'
import { getAllBoards } from '../usecases/get-all-boards.usecase'

export const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBoards.fulfilled, (state, action) => {
      columnEntityAdapter.addMany(
        state,
        action.payload.flatMap((board) =>
          board.columns.map((col) => ({
            id: col.id,
            name: col.name,
            tasks: [],
            board: board.id,
          })),
        ),
      )
    })

    builder.addCase(createBoard.fulfilled, (state, action) => {
      columnEntityAdapter.addMany(
        state,
        action.payload.columns.map((col) => ({
          id: col.id,
          name: col.name,
          tasks: [],
          board: action.payload.id,
        })),
      )
    })

    builder.addCase(updateBoard.fulfilled, (state, action) => {
      columnEntityAdapter.upsertMany(
        state,
        action.payload.columns.map((col) => ({
          id: col.id,
          name: col.name,
          tasks: [],
          board: action.payload.id,
        })),
      )
    })
  },
})

export const selectColumns = (state: RootState) => {
  return columnEntityAdapter.getSelectors().selectAll(state.columns)
}

export const selectColumn = (state: RootState, id: string) => {
  return columnEntityAdapter.getSelectors().selectById(state.columns, id)
}

export const selectColumnsWithIds = createSelector(
  (state: RootState, ids: string[]) =>
    [columnEntityAdapter.getSelectors().selectAll(state.columns), ids] as const,
  ([columns, ids]) => columns.filter((col) => ids.includes(col.id)),
)

export const selectColumnsFromBoard = createSelector(
  (state: RootState, boardId: string) =>
    [
      columnEntityAdapter.getSelectors().selectAll(state.columns),
      boardId,
    ] as const,
  ([columns, boardId]) => columns.filter((col) => col.board === boardId),
)
