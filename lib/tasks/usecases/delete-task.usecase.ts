import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const deleteTask = createAppAsyncThunk(
  'tasks/deleteTask',
  async ({ taskId }: { taskId: string }, { extra: { taskGateway } }) => {
    await taskGateway.deleteTask(taskId)
    return taskId
  },
)
