import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const updateTask = createAppAsyncThunk(
  'tasks/updateTask',
  async (
    task: {
      id: string
      name: string
      description: string
      boardId: string
      columnId: string
      subtasks: Array<{
        id: string
        name: string
        completed: boolean
        taskId: string
        boardId: string
      }>
    },
    { extra: { taskGateway } },
  ) => {
    await taskGateway.updateTask(task)
    return task
  },
)
