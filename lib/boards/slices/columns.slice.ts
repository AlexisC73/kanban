import { createSelector, createSlice } from '@reduxjs/toolkit'
import { columnEntityAdapter } from '../model/column.entity'
import { getBoards } from '../usecases/get-boards.usecase'
import { RootState } from '@/lib/store'
import { createBoard } from '../usecases/add-board.usecase'
import { editBoard } from '../usecases/edit-board.usecase'
import { deleteBoard } from '../usecases/deleteBoard.usecase'

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
            boardId: b.id,
          })),
        ),
      )
    })

    builder.addCase(createBoard.fulfilled, (state, action) => {
      if (!action.payload) {
        return
      }
      columnEntityAdapter.addMany(
        state,
        action.payload.columns.map((c) => ({
          id: c.id,
          name: c.name,
          boardId: c.boardId,
        })),
      )
    })

    builder.addCase(deleteBoard.fulfilled, (state, { meta }) => {
      const columnsId = columnEntityAdapter
        .getSelectors()
        .selectAll(state)
        .filter((c) => c.boardId === meta.arg)
        .map((c) => c.id)

      columnEntityAdapter.removeMany(state, columnsId)
    })

    builder.addCase(editBoard.fulfilled, (state, action) => {
      if (!action.payload) return
      const payload = action.payload
      const shouldRemoveCol = columnEntityAdapter
        .getSelectors()
        .selectAll(state)
        .filter((c) => c.boardId === payload.id)
        .filter((c) => !payload.columns.map((c) => c.id).includes(c.id))

      columnEntityAdapter.removeMany(
        state,
        shouldRemoveCol.map((c) => c.id),
      )

      columnEntityAdapter.upsertMany(
        state,
        action.payload.columns.map((c) => ({
          id: c.id,
          name: c.name,
          boardId: payload.id,
        })),
      )
    })
  },
})

export const selectColumns = createSelector(
  (state: RootState) =>
    columnEntityAdapter.getSelectors().selectAll(state.columns),
  (columns) => columns,
)

export const selectFirstColumnIdFromBoard = (boardId: string) =>
  createSelector(
    (state: RootState) =>
      columnEntityAdapter.getSelectors().selectAll(state.columns),
    (columns) => columns.filter((c) => c.boardId === boardId)[0].id,
  )

export const selectColumnsWithIds = createSelector(
  (state: RootState, columnIds: string[]) =>
    [
      columnEntityAdapter.getSelectors().selectAll(state.columns),
      columnIds,
    ] as const,
  ([columns, columnIds]) => columns.filter((c) => columnIds.includes(c.id)),
)

export const selectBoardColumns = createSelector(
  (state: RootState, boardId: string) =>
    [
      columnEntityAdapter.getSelectors().selectAll(state.columns),
      boardId,
    ] as const,
  ([columns, boardId]) => columns.filter((c) => c.boardId === boardId),
)

export const selectColumnName = createSelector(
  (state: RootState, columnId: string) => {
    return columnEntityAdapter
      .getSelectors()
      .selectById(state.columns, columnId)
  },
  (column) => column?.name,
)
