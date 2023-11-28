import { BoardFixture, createBoardFixture } from './fixtures/board.fixture'

describe('update board', () => {
  let boardFixture: BoardFixture
  beforeEach(() => {
    boardFixture = createBoardFixture()
  })

  test('Example: if board exist and update his name then name should be updated', async () => {
    boardFixture.givenExistingBoards([
      {
        id: '1',
        name: 'Board 1',
        columns: [],
      },
    ])

    await boardFixture.whenBoardUpdate({
      id: '1',
      name: 'Board 2',
      columns: [],
    })

    boardFixture.thenBoardShouldBe({
      id: '1',
      name: 'Board 2',
      columns: [],
    })
  })

  test('Example: if board exist and update a column name then column name should be updated', async () => {
    boardFixture.givenExistingBoards([
      {
        id: '1',
        name: 'Board 1',
        columns: [
          {
            id: '2',
            name: 'Column 1',
            tasks: [],
            board: '1',
          },
        ],
      },
    ])

    await boardFixture.whenBoardUpdate({
      id: '1',
      name: 'Board 2',
      columns: [
        {
          id: '2',
          name: 'Column 2',
        },
      ],
    })

    boardFixture.thenBoardShouldBe({
      id: '1',
      name: 'Board 2',
      columns: [
        {
          id: '2',
          board: '1',
          name: 'Column 2',
          tasks: [],
        },
      ],
    })
  })

  test('Example: if board exist and insert a new column name then column should be created', async () => {
    boardFixture.givenExistingBoards([
      {
        id: '1',
        name: 'Board 1',
        columns: [
          {
            id: '2',
            name: 'Column 1',
            tasks: [],
            board: '1',
          },
        ],
      },
    ])

    await boardFixture.whenBoardUpdate({
      id: '1',
      name: 'Board 2',
      columns: [
        {
          id: '2',
          name: 'Column 2',
        },
        {
          id: '3',
          name: 'Column 3',
        },
      ],
    })

    boardFixture.thenBoardShouldBe({
      id: '1',
      name: 'Board 2',
      columns: [
        {
          id: '2',
          board: '1',
          name: 'Column 2',
          tasks: [],
        },
        {
          id: '3',
          board: '1',
          name: 'Column 3',
          tasks: [],
        },
      ],
    })
  })

  test('Example: if board exist and delete a column then column should be deleted', async () => {
    boardFixture.givenExistingBoards([
      {
        id: '1',
        name: 'Board 1',
        columns: [
          {
            id: '2',
            name: 'Column 1',
            tasks: [],
            board: '1',
          },
          {
            id: '3',
            name: 'Column 3',
            tasks: [],
            board: '1',
          },
        ],
      },
    ])

    await boardFixture.whenBoardUpdate({
      id: '1',
      name: 'Board 2',
      columns: [
        {
          id: '2',
          name: 'Column 1',
        },
      ],
    })

    boardFixture.thenBoardShouldBe({
      id: '1',
      name: 'Board 2',
      columns: [
        {
          id: '2',
          board: '1',
          name: 'Column 1',
          tasks: [],
        },
      ],
    })
  })
})
