import { RootState } from '@/lib/store'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getAllBoardsWithoutColums } from '../usecases/get-all-boards.usecase'
import { createBoard } from '../usecases/add-board.usecase'
import { getBoardById } from '../usecases/get-board-by-id.usecase'
import { Board, boardEntityAdapter } from '../model/board.entity'

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: boardEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBoardsWithoutColums.fulfilled, (state, action) => {
      const boards: Board[] = action.payload.map((b) => ({ ...b, columns: [] }))
      boardEntityAdapter.upsertMany(state, boards)
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
  },
})

export const selectBoards = createSelector(
  (state: RootState) =>
    boardEntityAdapter.getSelectors().selectAll(state.boards),
  (boards) => boards,
)

export const selectBoard = (state: RootState, id: string) =>
  boardEntityAdapter.getSelectors().selectById(state.boards, id)
