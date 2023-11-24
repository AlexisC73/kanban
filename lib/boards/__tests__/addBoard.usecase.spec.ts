import { BoardFixture, createBoardFixture } from './fixtures/board.fixture'

describe('GetAllBoards', () => {
  let boardFixture: BoardFixture
  beforeEach(() => {
    boardFixture = createBoardFixture()
  })

  test('Example: if board created then should exist in store', async () => {
    boardFixture.givenExistingBoards([])

    await boardFixture.whenCreateNewBoard({
      name: 'Board 2',
    })

    boardFixture.thenBoardShouldExist({ name: 'Board 2' })
  })
})
