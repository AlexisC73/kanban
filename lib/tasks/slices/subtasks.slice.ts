import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/lib/store'
import { getTasks } from '../usecases/get-tasks.usecase'
import { subtasksEntityAdapter } from '../model/sutasks.entity'
import { addTask } from '../usecases/add-task.usecase'

export const subtasksSlice = createSlice({
  name: 'subtasks',
  initialState: subtasksEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      subtasksEntityAdapter.addMany(
        state,
        action.payload.flatMap((t) => t.subtasks),
      )
    })

    builder.addCase(addTask.fulfilled, (state, action) => {
      subtasksEntityAdapter.addMany(state, action.payload.subtasks)
    })
  },
})

export const selectSubtasks = (state: RootState) =>
  subtasksEntityAdapter.getSelectors().selectAll(state.subtasks)

export const selectSubtasksWithIds = (
  state: RootState,
  subtaskIds: string[],
) => {
  const subtasksEntity = subtasksEntityAdapter
    .getSelectors()
    .selectAll(state.subtasks)

  return subtasksEntity.filter((s) => subtaskIds.includes(s.id))
}
