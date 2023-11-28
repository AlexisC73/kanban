import { BoardFixture, createBoardFixture } from './fixtures/board.fixture'
import { boardBuilder } from './fixtures/boardBuilder'

describe('GetBoardById', () => {
  let boardFixture: BoardFixture

  beforeEach(() => {
    boardFixture = createBoardFixture()
  })

  test('Example: should get board by id', async () => {
    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board name 1',
        columns: [],
      },
    ])

    await boardFixture.whenRetrievingBooardInfoById({ id: 'board-id' })

    boardFixture.thenBoardShouldBe(
      boardBuilder().withId('board-id').withName('board name 1').build(),
    )
  })
})
