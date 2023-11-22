'use client'

import { Provider } from 'react-redux'
import { createStore } from './store'
import { FakeBoardGateway } from './boards/infra/fake-board.gateway'

const store = createStore({
  boardGateway: new FakeBoardGateway()
})

export function Providers ({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}