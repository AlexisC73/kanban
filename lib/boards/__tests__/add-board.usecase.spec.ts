import {
  AuthFixture,
  createAuthFixture,
} from '@/lib/auth/__tests__/auth.fixture'
import { testStateBuilderProvider } from '../../state.builder'
import { BoardFixture, createBoardFixture } from './fixture/boardFixture'

describe('Feature: Adding a new board', () => {
  let boardFixture: BoardFixture
  let authFixture: AuthFixture

  beforeEach(() => {
    const stateBuilderProvider = testStateBuilderProvider()
    authFixture = createAuthFixture(stateBuilderProvider)
    boardFixture = createBoardFixture(stateBuilderProvider)
  })
  it('Example: Adding a new board when no boards exist with no columns', async () => {
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })
    boardFixture.givenExistingBoards([], true)

    await boardFixture.whenAddingNewBoard({
      id: 'board-id',
      name: 'board-name',
      columns: [],
    })

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-id',
        name: 'board-name',
        owner: 'alice-id',
        columns: [],
      },
    ])
  })

  it('Example: Adding a new board when no boards exist with 2 columns', async () => {
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })
    boardFixture.givenExistingBoards([], true)

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
        owner: 'alice-id',
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
    authFixture.givenAuthenticatedUser({ id: 'alice-id' })

    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-1-id',
          name: 'board-1-name',
          owner: 'alice-id',
          columns: [
            {
              id: 'column-1-id',
              name: 'column-1-name',
              boardId: 'board-1-id',
            },
          ],
        },
      ],
      true,
    )

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
        owner: 'alice-id',
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
        owner: 'alice-id',
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
