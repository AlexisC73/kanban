import { RootState, createTestStore } from '@/lib/store'
import { FakeBoardGateway } from '../../infra/fake-board.gateway'
import { getBoards } from '../../usecases/get-boards.usecase'
import { stateBuilder } from '../../../state.builder'
import { createBoard } from '../../usecases/add-board.usecase'
import { editBoard } from '../../usecases/edit-board.usecase'
import { deleteBoard } from '../../usecases/deleteBoard.usecase'

export const createBoardFixture = (
  {
    boardGateway = new FakeBoardGateway(),
  }: Partial<{ boardGateway: FakeBoardGateway }> = {},
  initialState?: RootState,
) => {
  const store = createTestStore({ boardGateway }, initialState)

  return {
    givenExistingBoards(
      boards: Array<{
        id: string
        name: string
        columns: Array<{
          id: string
          name: string
          boardId: string
        }>
      }>,
    ) {
      boardGateway.boards = boards
    },
    async whenRetrievingBoards() {
      await store.dispatch(getBoards())
    },
    async whenAddingNewBoard(board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    }) {
      await store.dispatch(createBoard(board))
    },
    async whenEditBoard(board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    }) {
      try {
        await store.dispatch(editBoard(board))
      } catch (e) {}
    },
    async whenDeletingBoard(board: { id: string }) {
      try {
        await store.dispatch(deleteBoard(board.id))
      } catch (e) {}
    },
    thenBoardShouldBe(
      expectedBoards: Array<{
        id: string
        name: string
        columns: Array<{
          id: string
          name: string
          boardId: string
        }>
      }>,
    ) {
      const state = store.getState()
      const expectedState = stateBuilder()
        .withBoards(
          expectedBoards.map((b) => ({
            id: b.id,
            name: b.name,
            columns: b.columns.map((c) => c.id),
          })),
        )
        .withColumns(
          expectedBoards.flatMap((b) =>
            b.columns.map((c) => ({
              id: c.id,
              name: c.name,
              boardId: b.id,
            })),
          ),
        )
        .build()
      expect(state).toEqual(expectedState)
    },
  }
}

export type BoardFixture = ReturnType<typeof createBoardFixture>
