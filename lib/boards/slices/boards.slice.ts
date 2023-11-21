import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'
import { getAllBoardsName } from '../usecases/get-all-boards.usecase'

type Board = {
  id: string
  name: string
  columns: string[]
}

type BoardsState = {
  boards: { id: string; name: string }[]
  boardInfo: Board | null
}

const initialState: BoardsState = {
  boards: [],
  boardInfo: null
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(getAllBoardsName.fulfilled, (state, action) => {
      state.boards = action.payload
    })
  }
})

export const selectAllBoards = (state: RootState) => state.boards.boards
