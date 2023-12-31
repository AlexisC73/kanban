import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import { BoardGateway } from './boards/model/board.gateway'
import { FakeBoardGateway } from './boards/infra/fake-board.gateway'
import { rootReducer } from './root-reducer'
import { TaskGateway } from './tasks/model/tasks.gateway'
import { FakeTaskGateway } from './tasks/infra/fake-task.gateway'
import { AuthGateway } from './auth/models/auth.gateway'
import { FakeAuthGateway } from './auth/infra/fake-auth.gateway'

export interface Dependencies {
  boardGateway: BoardGateway
  taskGateway: TaskGateway
  authGateway: AuthGateway
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
  {
    boardGateway = new FakeBoardGateway(),
    taskGateway = new FakeTaskGateway(),
    authGateway = new FakeAuthGateway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) => {
  return createStore({ boardGateway, taskGateway, authGateway }, preloadedState)
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>
