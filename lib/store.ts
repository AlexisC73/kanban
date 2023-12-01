import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { BoardGateway } from './boards/model/board.gateway'
import { FakeBoardGateway } from './boards/infra/fake-board.gateway'
import { rootReducer } from './root-reducer'

export interface Dependencies {
  boardGateway: BoardGateway
}

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      })
    },
    preloadedState,
  })

export const createTestStore = (
  { boardGateway = new FakeBoardGateway() }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) => {
  return createStore({ boardGateway }, preloadedState)
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>
