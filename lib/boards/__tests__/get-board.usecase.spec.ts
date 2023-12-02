import { BoardFixture, createBoardFixture } from './fixture/boardFixture'

describe('Feature: Reetrieving boards', () => {
  let boardFixture: BoardFixture

  beforeEach(() => {
    boardFixture = createBoardFixture()
  })

  it('Example: Retrieving available boards when only one board exist', async () => {
    boardFixture.givenExistingBoards([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [{ id: 'column-id-1', name: 'Column 1', boardId: 'board-1' }],
      },
    ])

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [
          {
            id: 'column-id-1',
            name: 'Column 1',
            boardId: 'board-1',
          },
        ],
      },
    ])
  })

  it('Example: Retrieving available boards when multiple boards exist', async () => {
    boardFixture.givenExistingBoards([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [
          {
            id: 'column-1',
            name: 'Column 1',
            boardId: 'board-1',
          },
        ],
      },
      {
        id: 'board-2',
        name: 'Board 2',
        columns: [
          {
            id: 'column-2',
            name: 'Column 2',
            boardId: 'board-2',
          },
        ],
      },
    ])

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [
          {
            id: 'column-1',
            name: 'Column 1',
            boardId: 'board-1',
          },
        ],
      },
      {
        id: 'board-2',
        name: 'Board 2',
        columns: [
          {
            id: 'column-2',
            name: 'Column 2',
            boardId: 'board-2',
          },
        ],
      },
    ])
  })
})
