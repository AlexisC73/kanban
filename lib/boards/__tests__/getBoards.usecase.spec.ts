import { createStore } from '@/lib/store'
import { selectAllBoards } from '../slices/boards.slice'
import { getAllBoardsName } from '../usecases/get-all-boards.usecase'
import { FakeBoardGateway } from '../infra/fake-board.gateway'

describe('GetAllBoards', () => {
  test('Example: should get all boards', async () => {
    givenExistingBoardsName([
      { id: 'board1-id', name: 'Board 1' },
      { id: 'board2-id', name: 'Board 2' }
    ])

    await whenRetrievingBoards()

    thenReceivedBoardsNameShouldBe([
      { id: 'board1-id', name: 'Board 1' },
      { id: 'board2-id', name: 'Board 2' }
    ])
  })
})

const boardGateway = new FakeBoardGateway()

const store = createStore({
  boardGateway
})

function givenExistingBoardsName (boards: { id: string; name: string }[]) {
  boardGateway.boards = boards
}

async function whenRetrievingBoards () {
  await store.dispatch(getAllBoardsName())
}

function thenReceivedBoardsNameShouldBe (
  expectedBoards: { id: string; name: string }[]
) {
  const boards = selectAllBoards(store.getState())
  expect(boards).toEqual(expectedBoards)
}
