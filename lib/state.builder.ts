import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from '@reduxjs/toolkit'
import { Board, boardEntityAdapter } from './boards/model/board.entity'
import { rootReducer } from './root-reducer'
import { RootState } from './store'
import { Column, columnEntityAdapter } from './boards/model/column.entity'
import { Task, tasksEntityAdapter } from './tasks/model/tasks.entity'
import { Subtask, subtasksEntityAdapter } from './tasks/model/sutasks.entity'
import { AuthState } from './auth/slices/auth.slice'

const initialState = rootReducer(undefined, createAction(''))

const withBoards = createAction<Board[]>('withBoards')
const withColumns = createAction<Column[]>('withColumns')
const withTasks = createAction<Task[]>('withTasks')
const withSubtasks = createAction<Subtask[]>('withSubtasks')
const withAuthUser = createAction<AuthState>('withAuthUser')

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(withBoards, (state, action) => {
    boardEntityAdapter.removeAll(state.boards)
    boardEntityAdapter.addMany(state.boards, action.payload)
  })

  builder.addCase(withColumns, (state, action) => {
    columnEntityAdapter.removeAll(state.columns)
    columnEntityAdapter.addMany(state.columns, action.payload)
  })

  builder.addCase(withTasks, (state, action) => {
    tasksEntityAdapter.removeAll(state.tasks)
    tasksEntityAdapter.addMany(state.tasks, action.payload)
  })

  builder.addCase(withSubtasks, (state, action) => {
    subtasksEntityAdapter.removeAll(state.subtasks)
    subtasksEntityAdapter.addMany(state.subtasks, action.payload)
  })

  builder.addCase(withAuthUser, (state, action) => {
    state.auth = action.payload
  })
})

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <P>(actionCreator: ActionCreatorWithPayload<P>) =>
    (payload: P) =>
      stateBuilder(reducer(baseState, actionCreator(payload)))

  return {
    withBoards: reduce(withBoards),
    withColumns: reduce(withColumns),
    withTasks: reduce(withTasks),
    withSubtasks: reduce(withSubtasks),
    withAuthUser: reduce(withAuthUser),
    build(): RootState {
      return baseState
    },
  }
}

export const testStateBuilderProvider = () => {
  let builder = stateBuilder()

  return {
    getState() {
      return builder.build()
    },
    setState(updateFn: (_builder: StateBuilder) => StateBuilder) {
      builder = updateFn(builder)
      return updateFn(builder)
    },
  }
}

export type StateBuilder = ReturnType<typeof stateBuilder>
export type StateBuilderProvider = ReturnType<typeof testStateBuilderProvider>
