import { combineReducers } from '@reduxjs/toolkit'
import { boardReducer } from './boards/reducer'
import { taskReducer } from './tasks/reducer'
import { authReducer } from './auth/reducer'

export const rootReducer = combineReducers({
  ...boardReducer,
  ...taskReducer,
  ...authReducer,
})
