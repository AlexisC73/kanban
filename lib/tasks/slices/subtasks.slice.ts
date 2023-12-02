import { createSelector, createSlice } from '@reduxjs/toolkit'
import { subtaskEntityAdapter } from '../model/subtask.entity'
import { RootState } from '@/lib/store'

export const subtasksSlice = createSlice({
  name: 'subtasks',
  initialState: subtaskEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {},
})

export const selectSubtasks = createSelector(
  (state: RootState) =>
    subtaskEntityAdapter.getSelectors().selectAll(state.subtasks),
  (subtasks) => subtasks,
)

export const selectSubtasksWithIds = createSelector(
  (state: RootState, ids: string[]) =>
    [
      subtaskEntityAdapter.getSelectors().selectAll(state.subtasks),
      ids,
    ] as const,
  ([subtasks, ids]) => subtasks.filter((subtask) => ids.includes(subtask.id)),
)
