import {
  AuthFixture,
  createAuthFixture,
} from '@/lib/auth/__tests__/auth.fixture'
import { testStateBuilderProvider } from '../../state.builder'
import { BoardFixture, createBoardFixture } from './fixture/boardFixture'

describe('Feature: Delete a board', () => {
  let boardFixture: BoardFixture
  let authFixture: AuthFixture

  beforeEach(() => {
    const stateBuilderProvider = testStateBuilderProvider()
    boardFixture = createBoardFixture(stateBuilderProvider)
    authFixture = createAuthFixture(stateBuilderProvider)
  })
  it('Example: delete a board with no columns', async () => {
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

    await boardFixture.whenDeletingBoard({
      id: 'board-id',
    })

    boardFixture.thenBoardShouldBe([])
  })

  it('Example: delete a board with columns', async () => {
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

    await boardFixture.whenDeletingBoard({
      id: 'board-id',
    })

    boardFixture.thenBoardShouldBe([])
  })

  it('Example: delete a board with columns and task with subtasks', async () => {
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

    await boardFixture.whenDeletingBoard({
      id: 'board-id',
    })

    boardFixture.thenBoardShouldBe([])
  })
})
