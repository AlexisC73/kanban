import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const getTasks = createAppAsyncThunk(
  'tasks/getTasks',
  async (_, { extra: { taskGateway } }) => {
    const tasks = await taskGateway.getTasks()
    return tasks
  },
)
