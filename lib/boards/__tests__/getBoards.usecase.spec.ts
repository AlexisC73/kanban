import { BoardFixture, createBoardFixture } from './fixtures/board.fixture'

describe('GetAllBoards', () => {
  let boardFixture: BoardFixture
  beforeEach(() => {
    boardFixture = createBoardFixture()
  })
  test('Example: should get all boards', async () => {
    boardFixture.givenExistingBoards([
      { id: 'board1-id', name: 'Board 1', columns: [] },
      { id: 'board2-id', name: 'Board 2', columns: [] }
    ])

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenReceivedBoardsShouldBe([
      { id: 'board1-id', name: 'Board 1', columns: [] },
      { id: 'board2-id', name: 'Board 2', columns: [] }
    ])
  })
})
