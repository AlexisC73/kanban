import { RootState } from '@/lib/store'
import { createSlice } from '@reduxjs/toolkit'
import { getAllBoardsWithoutColums } from '../usecases/get-all-boards.usecase'
import { createBoard } from '../usecases/add-board.usecase'
import { getBoardById } from '../usecases/get-board-by-id.usecase'

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
    builder.addCase(getAllBoardsWithoutColums.fulfilled, (state, action) => {
      return action.payload.map(b => ({
        id: b.id,
        name: b.name,
        columns: []
      }))
    })

    builder.addCase(createBoard.fulfilled, (state, action) => {
      return [...state, action.payload]
    })

    builder.addCase(getBoardById.fulfilled, (state, action) => {
      const boardInfo = action.payload
      if (!boardInfo) return
      if (state.findIndex(s => s.id === boardInfo.id) === -1) {
        return [...state, boardInfo]
      }
      return state.map(b => (b.id === boardInfo.id ? boardInfo : b))
    })
  }
})

export const selectAllBoards = (state: RootState) => state.boards
export const selectBoardById = (state: RootState, id: string) =>
  state.boards.find(b => b.id === id)
