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

const initialState = rootReducer(undefined, createAction(''))

const withBoards = createAction<Board[]>('withBoards')
const withColumns = createAction<Column[]>('withColumns')
const withTasks = createAction<Task[]>('withTasks')
const withSubtasks = createAction<Subtask[]>('withSubtasks')

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(withBoards, (state, action) => {
    boardEntityAdapter.addMany(state.boards, action.payload)
  })

  builder.addCase(withColumns, (state, action) => {
    columnEntityAdapter.addMany(state.columns, action.payload)
  })

  builder.addCase(withTasks, (state, action) => {
    tasksEntityAdapter.addMany(state.tasks, action.payload)
  })

  builder.addCase(withSubtasks, (state, action) => {
    subtasksEntityAdapter.addMany(state.subtasks, action.payload)
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
    build(): RootState {
      return baseState
    },
  }
}
