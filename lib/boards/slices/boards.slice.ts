import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'
import { getAllBoardsName } from '../usecases/get-all-boards.usecase'

type Board = {
  id: string
  name: string
  columns: string[]
}

type BoardsState = {
  boardsName: string[]
  boardInfo: Board
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: {} as BoardsState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(getAllBoardsName.fulfilled, (state, action) => {
      state.boardsName = action.payload
    })
  }
})

export const selectAllBoardsName = (state: RootState) => state.boards
