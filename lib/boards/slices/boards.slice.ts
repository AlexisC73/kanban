import { createSelector, createSlice } from '@reduxjs/toolkit'
import { boardEntityAdapter } from '../model/board.entity'
import { getBoards } from '../usecases/get-boards.usecase'
import { RootState } from '@/lib/store'
import { createBoard } from '../usecases/add-board.usecase'
import { editBoard } from '../usecases/edit-board.usecase'
import { columnEntityAdapter } from '../model/column.entity'
import { deleteBoard } from '../usecases/deleteBoard.usecase'

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: boardEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      boardEntityAdapter.addMany(
        state,
        action.payload.map((b) => ({
          id: b.id,
          name: b.name,
          owner: b.owner,
          columns: b.columns.map((c) => c.id),
        })),
      )
    })

    builder.addCase(createBoard.fulfilled, (state, action) => {
      if (!action.payload) {
        return
      }
      boardEntityAdapter.addOne(state, {
        id: action.payload.id,
        name: action.payload.name,
        owner: action.payload.owner,
        columns: action.payload.columns.map((c) => c.id),
      })
    })

    builder.addCase(editBoard.fulfilled, (state, action) => {
      if (!action.payload) return
      boardEntityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          name: action.payload.name,
          columns: action.payload.columns.map((c) => c.id),
        },
      })
    })

    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      if (!action.payload) return
      boardEntityAdapter.removeOne(state, action.payload)
    })
  },
})

export const selectBoards = createSelector(
  (state: RootState) =>
    boardEntityAdapter.getSelectors().selectAll(state.boards),
  (boards) => boards,
)

export const selectBoard = createSelector(
  (state: RootState, boardId: string) =>
    boardEntityAdapter.getSelectors().selectById(state.boards, boardId),
  (board) => board,
)

export const selectColumnsIdForBoard = (state: RootState, boardId: string) => {
  return (
    boardEntityAdapter.getSelectors().selectById(state.boards, boardId)
      ?.columns ?? []
  )
}

export const selectFirstColumnForBoard = (
  state: RootState,
  boardId: string,
) => {
  const firstColumnId = boardEntityAdapter
    .getSelectors()
    .selectById(state.boards, boardId)?.columns[0]
  if (!firstColumnId) return undefined

  return columnEntityAdapter
    .getSelectors()
    .selectById(state.columns, firstColumnId)
}

export const selectBoardTitle = (boardId?: string) => (state: RootState) => {
  if (!boardId) return undefined
  return (
    boardEntityAdapter.getSelectors().selectById(state.boards, boardId)?.name ??
    'No board found'
  )
}
