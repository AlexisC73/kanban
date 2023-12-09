import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const updateSubtaskStatus = createAppAsyncThunk(
  'tasks/updateSubtaskStatus',
  async (
    { id, completed }: { id: string; completed: boolean },
    { extra: { taskGateway } },
  ) => {
    const updatedSubtask = await taskGateway.updateSubtaskStatus({
      id,
      completed,
    })

    return updatedSubtask
  },
)
