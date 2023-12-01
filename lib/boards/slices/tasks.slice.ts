import { createSlice } from '@reduxjs/toolkit'
import { taskEntityAdapter } from '../model/task.entity'
import { getBoards } from '../usecases/get-boards.usecase'
import { RootState } from '@/lib/store'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      taskEntityAdapter.addMany(
        state,
        action.payload.flatMap((b) =>
          b.columns.flatMap((c) =>
            c.tasks.map((t) => ({
              id: t.id,
              name: t.name,
              description: t.description,
              status: t.status,
              subtasks: t.subtasks.map((s) => s.id),
            })),
          ),
        ),
      )
    })
  },
})

export const selectTasks = (state: RootState, taskIds: string[]) => {
  return taskEntityAdapter
    .getSelectors()
    .selectAll(state.tasks)
    .filter((t) => taskIds.includes(t.id))
}
