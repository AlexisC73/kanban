import { authSlice } from './slices/auth.slice'

export const authReducer = {
  [authSlice.name]: authSlice.reducer,
}
