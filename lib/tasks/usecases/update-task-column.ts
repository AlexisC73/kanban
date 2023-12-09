import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const updateTaskStatus = createAppAsyncThunk(
  'tasks/updateTaskStatus',
  async (
    { id, columnId }: { id: string; columnId: string },
    { extra: { taskGateway } },
  ) => {
    const newTask = await taskGateway.updateTaskStatus({ id, columnId })
    return newTask
  },
)
