import { EntityState, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/lib/store'
import { getTasks } from '../usecases/get-tasks.usecase'
import { Subtask, subtasksEntityAdapter } from '../model/sutasks.entity'
import { addTask } from '../usecases/add-task.usecase'
import { updateSubtaskStatus } from '../usecases/update-subtask-completion'
import { deleteBoard } from '@/lib/boards/usecases/deleteBoard.usecase'
import { updateTask } from '../usecases/update-task.usecase'

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

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const taskId = action.payload.id
      const currentSubtasksId = selectSubtasksIdsForTaskId(state, taskId)
      const updatedIds = action.payload.subtasks.map((s) => s.id)

      currentSubtasksId.forEach((id) =>
        !updatedIds.includes(id)
          ? subtasksEntityAdapter.removeOne(state, id)
          : null,
      )
      subtasksEntityAdapter.upsertMany(
        state,
        action.payload.subtasks.map((s) => ({
          boardId: action.payload.boardId,
          taskId: action.payload.id,
          completed: s.completed,
          id: s.id,
          name: s.name,
        })),
      )
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

const selectSubtasksIdsForTaskId = (
  state: EntityState<Subtask>,
  taskId: string,
) => {
  return subtasksEntityAdapter
    .getSelectors()
    .selectAll(state)
    .filter((s) => s.taskId === taskId)
    .map((s) => s.id)
}
