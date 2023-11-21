import { createStore } from '@/lib/store'
import { selectAllBoardsName } from '../slices/boards.slice'
import { getAllBoardsName } from '../usecases/get-all-boards.usecase'
import { FakeBoardGateway } from '../infra/fake-board.gateway'

describe('GetAllBoards', () => {
  test('Example: should get all boards', async () => {
    givenExistingBoardsName(['board1-id', 'board2-id'])

    await whenRetrievingBoards()

    thenReceivedBoardsNameShouldBe(['board1-id', 'board2-id'])
  })
})

const boardGateway = new FakeBoardGateway()

const store = createStore({
  boardGateway
})

function givenExistingBoardsName (boards: string[]) {
  boardGateway.boardsName = boards
}

async function whenRetrievingBoards () {
  await store.dispatch(getAllBoardsName())
}

function thenReceivedBoardsNameShouldBe (expectedBoards: string[]) {
  const boards = selectAllBoardsName(store.getState())
  expect(boards.boardsName).toEqual(expectedBoards)
}
