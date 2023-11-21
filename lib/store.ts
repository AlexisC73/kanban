import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { boardsSlice } from './boards/slices/boards.slice'
import { BoardGateway } from './boards/model/board.gateway'

export type Dependencies = {
  boardGateway: BoardGateway
}

export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: {
      [boardsSlice.name]: boardsSlice.reducer
    },
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies
        }
      })
    }
  })

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>
