import { BoardFixture, createBoardFixture } from './fixtures/board.fixture'
import { boardBuilder } from './fixtures/boardBuilder'

describe('GetAllBoards', () => {
  let boardFixture: BoardFixture
  beforeEach(() => {
    boardFixture = createBoardFixture()
  })
  test('Example: should get all boards', async () => {
    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'Board 1 name',
        columns: [],
      },
      {
        id: 'board-id-2',
        name: 'Board 2 name',
        columns: [],
      },
    ])

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenReceivedBoardsShouldBe([
      boardBuilder().withId('board-id').withName('Board 1 name').build(),
      boardBuilder().withId('board-id-2').withName('Board 2 name').build(),
    ])
  })
})
