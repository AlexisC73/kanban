import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { BoardGateway } from './boards/model/board.gateway'
import { reducer } from './boards/reducer'

export interface Dependencies {
  boardGateway: BoardGateway
}

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<ReturnType<typeof reducer>>,
) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      })
    },
  })

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>
