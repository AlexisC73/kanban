import { createAppAsyncThunk } from '@/lib/create-app-thunk'

export const signupWithGithub = createAppAsyncThunk(
  'auth/signupWithGithub',
  async (_, { extra: { authGateway } }) => {
    return await authGateway.signupWithGithub()
  },
)
