import { createSlice } from '@reduxjs/toolkit'
import { tasksEntityAdapter } from '../model/tasks.entity'
import { RootState } from '@/lib/store'
import { getTasks } from '../usecases/get-tasks.usecase'
import { addTask } from '../usecases/add-task.usecase'
import { updateTaskStatus } from '../usecases/update-task-column'
import { deleteBoard } from '@/lib/boards/usecases/deleteBoard.usecase'
import { updateTask } from '../usecases/update-task.usecase'
import { deleteTask } from '../usecases/delete-task.usecase'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      tasksEntityAdapter.addMany(
        state,
        action.payload.map((t) => ({
          id: t.id,
          name: t.name,
          boardId: t.boardId,
          columnId: t.columnId,
          description: t.description,
          subtasks: t.subtasks.map((s) => s.id),
        })),
      )
    })

    builder.addCase(addTask.fulfilled, (state, action) => {
      tasksEntityAdapter.addOne(state, {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        columnId: action.payload.columnId,
        boardId: action.payload.boardId,
        subtasks: action.payload.subtasks.map((s) => s.id),
      })
    })

    builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
      tasksEntityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          columnId: action.payload.columnId,
        },
      })
    })

    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      const tasksId = tasksEntityAdapter
        .getSelectors()
        .selectAll(state)
        .filter((t) => t.boardId === action.meta.arg)
        .map((t) => t.id)
      tasksEntityAdapter.removeMany(state, tasksId)
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      tasksEntityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          name: action.payload.name,
          description: action.payload.description,
          columnId: action.payload.columnId,
          subtasks: action.payload.subtasks.map((s) => s.id),
        },
      })
    })

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      tasksEntityAdapter.removeOne(state, action.meta.arg.taskId)
    })
  },
})

export const selectTasks = (state: RootState) =>
  tasksEntityAdapter.getSelectors().selectAll(state.tasks)

export const selectTask = (state: RootState, taskId: string) =>
  tasksEntityAdapter.getSelectors().selectById(state.tasks, taskId)

export const selectBoardTasks = (state: RootState, boardId: string) => {
  const tasksEntity = tasksEntityAdapter
    .getSelectors()
    .selectAll(state.tasks)
    .filter((t) => t.boardId === boardId)

  return tasksEntity.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    columnId: t.columnId,
    boardId: t.boardId,
    subtasks: t.subtasks,
  }))
}
