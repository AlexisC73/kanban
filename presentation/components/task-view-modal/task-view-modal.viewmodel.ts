import { RootState } from '@/lib/store'
import { selectSubtasksWithIds } from '@/lib/tasks/slices/subtasks.slice'
import { selectTask } from '@/lib/tasks/slices/tasks.slice'

export enum TaskModalViewModelType {
  NO_TASK = 'NO_TASK',
  WITH_TASK = 'WITH_TASK',
}

export const selectTaskModalViewModel = (
  state: RootState,
  taskId: string,
):
  | { type: TaskModalViewModelType.NO_TASK }
  | {
      type: TaskModalViewModelType.WITH_TASK
      data: {
        id: string
        name: string
        description: string
        columnId: string
        boardId: string
        completedSubtasksCount: number
        totalSubtasksCount: number
        subtasks: Array<{
          id: string
          name: string
          completed: boolean
          taskId: string
          boardId: string
        }>
      }
    } => {
  const task = selectTask(state, taskId)
  if (!task) {
    return {
      type: TaskModalViewModelType.NO_TASK,
    }
  }

  const subtasks = selectSubtasksWithIds(state, task.subtasks)

  return {
    type: TaskModalViewModelType.WITH_TASK,
    data: {
      id: task.id,
      name: task.name,
      description: task.description,
      columnId: task.columnId,
      boardId: task.boardId,
      completedSubtasksCount: subtasks.filter((subtask) => subtask.completed)
        .length,
      totalSubtasksCount: subtasks.length,
      subtasks,
    },
  }
}
