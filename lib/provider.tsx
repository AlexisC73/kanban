'use client'

import { Provider } from 'react-redux'
import { createStore } from './store'
import { getBoards } from './boards/usecases/get-boards.usecase'
import { authGateway, boardGateway, taskGateway } from './config'

authGateway.signinWithGithubWillSucceedForUser = { id: 'fake-user-id' }

const store = createStore({ authGateway, boardGateway, taskGateway })

export function Providers({ children }: { children: React.ReactNode }) {
  store.dispatch(getBoards)
  return <Provider store={store}>{children}</Provider>
}
