import { createSlice } from '@reduxjs/toolkit'
import { signupWithGithub } from '../usecases/signup-with-github.usecase'
import { signinWithGithub } from '../usecases/signin-with-github.usecase'

interface AuthState {
  user?: { id: string }
  token?: string
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupWithGithub.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(signinWithGithub.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
      })
  },
})
