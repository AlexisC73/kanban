'use client'

import { Provider } from 'react-redux'
import { createTestStore } from './store'
import { getBoards } from './boards/usecases/get-boards.usecase'
import { FakeAuthGateway } from './auth/infra/fake-auth.gateway'

const authGateway = new FakeAuthGateway()
authGateway.signinWithGithubWillSucceedForUser = { id: 'fake-user-id' }

const store = createTestStore({ authGateway })

export function Providers({ children }: { children: React.ReactNode }) {
  store.dispatch(getBoards)
  return <Provider store={store}>{children}</Provider>
}
