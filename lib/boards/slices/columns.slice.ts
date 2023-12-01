import { createSelector, createSlice } from '@reduxjs/toolkit'
import { columnEntityAdapter } from '../model/column.entity'
import { getBoards } from '../usecases/get-boards.usecase'
import { RootState } from '@/lib/store'
import { createBoard } from '../usecases/add-board.usecase'

export const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      columnEntityAdapter.addMany(
        state,
        action.payload.flatMap((b) =>
          b.columns.map((c) => ({
            id: c.id,
            name: c.name,
            tasks: c.tasks.map((t) => t.id),
          })),
        ),
      )
    })

    builder.addCase(createBoard.fulfilled, (state, { meta }) => {
      columnEntityAdapter.addMany(
        state,
        meta.arg.columns.map((c) => ({
          id: c.id,
          name: c.name,
          tasks: [],
        })),
      )
    })
  },
})

export const selectColumns = createSelector(
  (state: RootState, columnIds: string[]) =>
    [
      columnEntityAdapter.getSelectors().selectAll(state.columns),
      columnIds,
    ] as const,
  ([columns, columnIds]) => columns.filter((c) => columnIds.includes(c.id)),
)