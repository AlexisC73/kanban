'use client'

import { Provider } from 'react-redux'
import { createStore } from './store'
import { FakeBoardGateway } from './boards/infra/fake-board.gateway'
import { getAllBoardsWithoutColums } from './boards/usecases/get-all-boards.usecase'

const store = createStore({
  boardGateway: new FakeBoardGateway(),
})

export function Providers({ children }: { children: React.ReactNode }) {
  store.dispatch(getAllBoardsWithoutColums)
  return <Provider store={store}>{children}</Provider>
}
