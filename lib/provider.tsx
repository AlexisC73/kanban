'use client'

import { Provider } from 'react-redux'
import { createStore } from './store'
import { FakeBoardGateway } from './boards/infra/fake-board.gateway'
import { getAllBoards } from './boards/usecases/get-all-boards.usecase'

const store = createStore({
  boardGateway: new FakeBoardGateway(),
})

export function Providers({ children }: { children: React.ReactNode }) {
  store.dispatch(getAllBoards)
  return <Provider store={store}>{children}</Provider>
}
