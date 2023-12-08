import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const addTask = createAppAsyncThunk(
  'tasks/addTask',
  async (
    task: {
      id: string
      name: string
      description: string
      columnId: string
      boardId: string
      subtasks: Array<{
        id: string
        name: string
        completed: boolean
        taskId: string
      }>
    },
    { extra: { taskGateway } },
  ) => {
    // await taskGateway.addTask(task)
    return task
  },
)
