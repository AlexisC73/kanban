import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const signinWithGithub = createAppAsyncThunk(
  'auth/signinWithGithub',
  async (_, { extra: { authGateway } }) => {
    return await authGateway.signinWithGithub()
  },
)
