import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/lib/store'
import { getTasks } from '../usecases/get-tasks.usecase'
import { subtasksEntityAdapter } from '../model/sutasks.entity'
import { addTask } from '../usecases/add-task.usecase'
import { updateSubtaskStatus } from '../usecases/update-subtask-completion'
import { deleteBoard } from '@/lib/boards/usecases/deleteBoard.usecase'

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

    builder.addCase(updateSubtaskStatus.fulfilled, (state, action) => {
      subtasksEntityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          completed: action.payload.completed,
        },
      })
    })

    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      const tasksId = subtasksEntityAdapter
        .getSelectors()
        .selectAll(state)
        .filter((t) => t.boardId === action.meta.arg)
        .map((t) => t.id)
      subtasksEntityAdapter.removeMany(state, tasksId)
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
