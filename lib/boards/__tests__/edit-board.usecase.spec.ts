import { stateBuilder } from '@/lib/state.builder'
import { BoardFixture, createBoardFixture } from './fixture/boardFixture'

describe('Feature: Editing board', () => {
  let boardFixture: BoardFixture

  beforeEach(() => {
    boardFixture = createBoardFixture()
  })

  it('Example: Editing an existing board', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([{ id: 'board-id', name: 'board-name', columns: [] }])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [],
      },
    ])

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'new-board-name',
      columns: [],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'new-board-name',
        columns: [],
      },
    ])
  })

  it('Example: Editing existing column name of a board', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          { id: 'board-id', name: 'board-name', columns: ['column-id-1'] },
        ])
        .withColumns([
          { id: 'column-id-1', name: 'column 1', boardId: 'board-id' },
        ])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [
          {
            id: 'column-id-1',
            name: 'column 1',
            boardId: 'board-id',
          },
        ],
      },
    ])

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'new-board-name',
      columns: [
        {
          id: 'column-id-1',
          name: 'column 1 edited',
        },
      ],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'new-board-name',
        columns: [
          {
            id: 'column-id-1',
            name: 'column 1 edited',
            boardId: 'board-id',
          },
        ],
      },
    ])
  })

  it('Example: Editing existing column name of a board when multiple column exists', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'board-name',
            columns: ['column-id-1', 'column-id-2'],
          },
        ])
        .withColumns([
          { id: 'column-id-1', name: 'column 1', boardId: 'board-id' },
          { id: 'column-id-2', name: 'column 2', boardId: 'board-id' },
        ])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [
          { id: 'column-id-1', name: 'column 1', boardId: 'board-id' },
          { id: 'column-id-2', name: 'column 2', boardId: 'board-id' },
        ],
      },
    ])

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'new-board-name',
      columns: [
        { id: 'column-id-1', name: 'column 1 edited' },
        { id: 'column-id-2', name: 'column 2' },
      ],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'new-board-name',
        columns: [
          {
            id: 'column-id-1',
            name: 'column 1 edited',
            boardId: 'board-id',
          },
          { id: 'column-id-2', name: 'column 2', boardId: 'board-id' },
        ],
      },
    ])
  })

  it('Example: Editing existing board to add a column', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'board 1',
            columns: ['column-id-1', 'column-id-2'],
          },
        ])
        .withColumns([])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board 1',
        columns: [],
      },
    ])

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'board 1',
      columns: [{ id: 'column-id-1', name: 'column 1' }],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'board 1',
        columns: [
          {
            id: 'column-id-1',
            name: 'column 1',
            boardId: 'board-id',
          },
        ],
      },
    ])
  })

  it('Example: Editing existing board to remove a column', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'board 1',
            columns: ['column-id-1', 'column-id-2'],
          },
        ])
        .withColumns([
          {
            id: 'column-id-1',
            name: 'column 1',
            boardId: 'board-id',
          },
          {
            id: 'column-id-2',
            name: 'column 2',
            boardId: 'board-id',
          },
        ])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board 1',
        columns: [
          {
            id: 'column-id-1',
            name: 'column 1',
            boardId: 'board-id',
          },
          {
            id: 'column-id-2',
            name: 'column 2',
            boardId: 'board-id',
          },
        ],
      },
    ])

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'board 1',
      columns: [{ id: 'column-id-1', name: 'column 1' }],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'board 1',
        columns: [
          {
            id: 'column-id-1',
            name: 'column 1',
            boardId: 'board-id',
          },
        ],
      },
    ])
  })
})
