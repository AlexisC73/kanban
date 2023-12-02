import { createSelector, createSlice } from '@reduxjs/toolkit'
import { taskEntityAdapter } from '../model/task.entity'
import { RootState } from '@/lib/store'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {},
})

export const selectTasks = createSelector(
  (state: RootState) => taskEntityAdapter.getSelectors().selectAll(state.tasks),
  (tasks) => tasks,
)

export const selectBoardTasks = createSelector(
  (state: RootState, boardId: string) =>
    [taskEntityAdapter.getSelectors().selectAll(state.tasks), boardId] as const,
  ([tasks, boardId]) => tasks.filter((task) => task.boardId === boardId),
)
