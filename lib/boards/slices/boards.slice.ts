import { RootState } from '@/lib/store'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getAllBoards } from '../usecases/get-all-boards.usecase'
import { createBoard } from '../usecases/add-board.usecase'
import { getBoardById } from '../usecases/get-board-by-id.usecase'
import { boardEntityAdapter } from '../model/board.entity'
import { updateBoard } from '../usecases/update-board.usecase'

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: boardEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBoards.fulfilled, (state, action) => {
      boardEntityAdapter.upsertMany(
        state,
        action.payload.map((b) => ({
          id: b.id,
          name: b.name,
          columns: b.columns?.map((c) => c.id) ?? [],
        })),
      )
    })

    builder.addCase(createBoard.fulfilled, (state, action) => {
      boardEntityAdapter.addOne(state, {
        id: action.payload.id,
        name: action.payload.name,
        columns: action.payload.columns.map((c) => c.id),
      })
    })

    builder.addCase(getBoardById.fulfilled, (state, action) => {
      const boardInfo = action.payload
      boardEntityAdapter.upsertOne(state, {
        id: boardInfo.id,
        name: boardInfo.name,
        columns: boardInfo.columns.map((c) => c.id),
      })
    })

    builder.addCase(updateBoard.fulfilled, (state, action) => {
      const boardInfo = action.payload
      boardEntityAdapter.upsertOne(state, {
        id: boardInfo.id,
        name: boardInfo.name,
        columns: boardInfo.columns.map((c) => c.id),
      })
    })
  },
})

export const selectBoards = createSelector(
  (state: RootState) =>
    boardEntityAdapter.getSelectors().selectAll(state.boards),
  (boards) => boards,
)

export const selectBoard = createSelector(
  (state: RootState, id: string) =>
    boardEntityAdapter.getSelectors().selectById(state.boards, id),
  (board) => board,
)
