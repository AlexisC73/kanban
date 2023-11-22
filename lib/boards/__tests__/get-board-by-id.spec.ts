import { BoardFixture, createBoardFixture } from './fixtures/board.fixture'
import { boardBuilder } from './fixtures/boardBuilder'

describe('GetBoardById', () => {
  let boardFixture: BoardFixture

  beforeEach(() => {
    boardFixture = createBoardFixture()
  })

  test('Example: should get board by id', async () => {
    boardFixture.givenExistingBoards([
      boardBuilder().withId('board-id').withName('board name 1').build(),
      boardBuilder().withId('board-id-2').withName('board name 2').build()
    ])

    await boardFixture.whenRetrievingBooardInfoById({ id: 'board-id' })

    boardFixture.thenBoardShouldBe(
      boardBuilder().withId('board-id').withName('board name 1').build()
    )
  })
})
