import { createSelector, createSlice } from '@reduxjs/toolkit'
import { boardEntityAdapter } from '../model/board.entity'
import { getBoards } from '../usecases/get-boards.usecase'
import { RootState } from '@/lib/store'

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
          columns: b.columns.map((c) => c.id),
        })),
      )
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
