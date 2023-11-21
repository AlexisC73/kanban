import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'
import { getAllBoards } from '../usecases/get-all-boards.usecase'
import { createBoard } from '../usecases/add-board.usecase'

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
    builder.addCase(getAllBoards.fulfilled, (state, action) => {
      state.boards = action.payload
    })

    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload)
    })
  }
})

export const selectAllBoards = (state: RootState) => state.boards.boards

export const selectBoardByName = (state: RootState, name: string) =>
  state.boards.boards.find(board => board.name === name)
