import { BoardFixture, createBoardFixture } from './fixtures/board.fixture'

describe('GetAllBoards', () => {
  let boardFixture: BoardFixture
  beforeEach(() => {
    boardFixture = createBoardFixture()
  })
  test('Example: should get all boards', async () => {
    boardFixture.givenExistingBoards([
      { id: 'board1-id', name: 'Board 1' },
      { id: 'board2-id', name: 'Board 2' }
    ])

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenReceivedBoardsNameShouldBe([
      { id: 'board1-id', name: 'Board 1' },
      { id: 'board2-id', name: 'Board 2' }
    ])
  })
})
