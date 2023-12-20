import { testStateBuilderProvider } from '@/lib/state.builder'
import { BoardFixture, createBoardFixture } from './fixture/boardFixture'
import {
  AuthFixture,
  createAuthFixture,
} from '@/lib/auth/__tests__/auth.fixture'

describe('Feature: Editing board', () => {
  let boardFixture: BoardFixture
  let authFixture: AuthFixture

  beforeEach(() => {
    const stateBuilderProvider = testStateBuilderProvider()
    boardFixture = createBoardFixture(stateBuilderProvider)
    authFixture = createAuthFixture(stateBuilderProvider)
  })

  it('Example: Editing an existing board', async () => {
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })
    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-id',
          name: 'board-name',
          owner: 'alice-id',
          columns: [],
        },
      ],
      true,
    )

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'new-board-name',
      columns: [],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'new-board-name',
        owner: 'alice-id',
        columns: [],
      },
    ])
  })

  it('Example: Editing existing column name of a board', async () => {
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })
    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-id',
          name: 'board-name',
          owner: 'alice-id',
          columns: [
            {
              id: 'column-id-1',
              name: 'column 1',
              boardId: 'board-id',
            },
          ],
        },
      ],
      true,
    )

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
        owner: 'alice-id',
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
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })

    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-id',
          name: 'board-name',
          owner: 'alice-id',
          columns: [
            { id: 'column-id-1', name: 'column 1', boardId: 'board-id' },
            { id: 'column-id-2', name: 'column 2', boardId: 'board-id' },
          ],
        },
      ],
      true,
    )

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
        owner: 'alice-id',
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
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })

    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-id',
          name: 'board 1',
          owner: 'alice-id',
          columns: [],
        },
      ],
      true,
    )

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'board 1',
      columns: [{ id: 'column-id-1', name: 'column 1' }],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'board 1',
        owner: 'alice-id',
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
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })

    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-id',
          name: 'board 1',
          owner: 'alice-id',
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
      ],
      true,
    )

    await boardFixture.whenEditBoard({
      id: 'board-id',
      name: 'board 1',
      columns: [{ id: 'column-id-1', name: 'column 1' }],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'board 1',
        owner: 'alice-id',
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
