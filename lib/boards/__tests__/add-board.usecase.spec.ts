import { stateBuilder } from '../../state.builder'
import { BoardFixture, createBoardFixture } from './fixture/boardFixture'

describe('Feature: Adding a new board', () => {
  let boardFixture: BoardFixture

  beforeEach(() => {
    boardFixture = createBoardFixture()
  })
  it('Example: Adding a new board when no boards exist with no columns', async () => {
    boardFixture = createBoardFixture({}, stateBuilder().withBoards([]).build())

    boardFixture.givenExistingBoards([])

    await boardFixture.whenAddingNewBoard({
      id: 'board-id',
      name: 'board-name',
      columns: [],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [],
      },
    ])
  })

  it('Example: Adding a new board when no boards exist with 2 columns', async () => {
    boardFixture = createBoardFixture({}, stateBuilder().withBoards([]).build())

    boardFixture.givenExistingBoards([])

    await boardFixture.whenAddingNewBoard({
      id: 'board-id',
      name: 'board-name',
      columns: [
        {
          id: 'column-id',
          name: 'column-name',
        },
        {
          id: 'column-id-2',
          name: 'column-name-2',
        },
      ],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [
          {
            id: 'column-id',
            name: 'column-name',
            boardId: 'board-id',
          },
          {
            id: 'column-id-2',
            name: 'column-name-2',
            boardId: 'board-id',
          },
        ],
      },
    ])
  })

  it('Example: Adding a new board when 1 board already exist', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-1-id',
            name: 'board-1-name',
            columns: ['column-1-id'],
          },
        ])
        .withColumns([
          {
            id: 'column-1-id',
            name: 'column-1-name',
            boardId: 'board-1-id',
          },
        ])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-1-id',
        name: 'board-1-name',
        columns: [
          {
            id: 'column-1-id',
            name: 'column-1-name',
            boardId: 'board-1-id',
          },
        ],
      },
    ])

    await boardFixture.whenAddingNewBoard({
      id: 'board-id',
      name: 'board-name',
      columns: [
        {
          id: 'column-id',
          name: 'column-name',
        },
        {
          id: 'column-id-2',
          name: 'column-name-2',
        },
      ],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1-id',
        name: 'board-1-name',
        columns: [
          {
            id: 'column-1-id',
            name: 'column-1-name',
            boardId: 'board-1-id',
          },
        ],
      },
      {
        id: 'board-id',
        name: 'board-name',
        columns: [
          {
            id: 'column-id',
            name: 'column-name',
            boardId: 'board-id',
          },
          {
            id: 'column-id-2',
            name: 'column-name-2',
            boardId: 'board-id',
          },
        ],
      },
    ])
  })
})
