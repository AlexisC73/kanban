'use client'

import { Provider } from 'react-redux'
import { createTestStore } from './store'
import { getBoards } from './boards/usecases/get-boards.usecase'

const store = createTestStore({}, {})

export function Providers({ children }: { children: React.ReactNode }) {
  store.dispatch(getBoards)
  return <Provider store={store}>{children}</Provider>
}
