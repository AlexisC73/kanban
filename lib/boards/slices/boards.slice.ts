import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'
import { getAllBoards } from '../usecases/get-all-boards.usecase'
import { createBoard } from '../usecases/add-board.usecase'

type Board = {
  id: string
  name: string
  columns: string[]
}

const initialState: Board[] = []

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder.addCase(getAllBoards.fulfilled, (state, action) => {
      return action.payload
    })

    builder.addCase(createBoard.fulfilled, (state, action) => {
      return [...state, action.payload]
    })
  }
})

export const selectAllBoards = (state: RootState) => state.boards

export const selectBoardByName = (state: RootState, name: string) =>
  state.boards.find(board => board.name === name)
