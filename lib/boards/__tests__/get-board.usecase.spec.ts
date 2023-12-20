import {
  AuthFixture,
  createAuthFixture,
} from '@/lib/auth/__tests__/auth.fixture'
import { BoardFixture, createBoardFixture } from './fixture/boardFixture'
import { testStateBuilderProvider } from '@/lib/state.builder'

describe('Feature: Reetrieving boards', () => {
  let boardFixture: BoardFixture
  let authFixture: AuthFixture

  beforeEach(() => {
    const stateBuilderProvider = testStateBuilderProvider()
    boardFixture = createBoardFixture(stateBuilderProvider)
    authFixture = createAuthFixture(stateBuilderProvider)
  })

  it('Example: Retrieving available boards when only one board exist', async () => {
    const user = { id: 'alice-id', token: JSON.stringify({ id: 'alice-id' }) }

    authFixture.givenAuthenticatedUser({ id: user.id })
    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-1',
          name: 'Board 1',
          owner: 'alice-id',
          columns: [
            { id: 'column-id-1', name: 'Column 1', boardId: 'board-1' },
          ],
        },
      ],
      false,
    )

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1',
        name: 'Board 1',
        owner: 'alice-id',
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
    const user = { id: 'alice-id', token: JSON.stringify({ id: 'alice-id' }) }

    authFixture.givenAuthenticatedUser({ id: user.id })

    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-1',
          name: 'Board 1',
          owner: 'alice-id',
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
          owner: 'alice-id',
          columns: [
            {
              id: 'column-2',
              name: 'Column 2',
              boardId: 'board-2',
            },
          ],
        },
      ],
      false,
    )

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1',
        name: 'Board 1',
        owner: 'alice-id',
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
        owner: 'alice-id',
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

  it('Example: Retrieving available boards when multiple boards exist and one is not our board', async () => {
    const user = { id: 'alice-id', token: JSON.stringify({ id: 'alice-id' }) }

    authFixture.givenAuthenticatedUser({ id: user.id })

    boardFixture.givenExistingBoards(
      [
        {
          id: 'board-1',
          name: 'Board 1',
          owner: 'alice-id',
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
          owner: 'alice-id',
          columns: [
            {
              id: 'column-2',
              name: 'Column 2',
              boardId: 'board-2',
            },
          ],
        },
        {
          id: 'board-3',
          name: 'Board 3',
          owner: 'bob-id',
          columns: [
            {
              id: 'column-3',
              name: 'Column 3',
              boardId: 'board-3',
            },
          ],
        },
      ],
      false,
    )

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1',
        name: 'Board 1',
        owner: 'alice-id',
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
        owner: 'alice-id',
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
