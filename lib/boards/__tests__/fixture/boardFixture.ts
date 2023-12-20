import { AppStore, createTestStore } from '@/lib/store'
import { FakeBoardGateway } from '../../infra/fake-board.gateway'
import { getBoards } from '../../usecases/get-boards.usecase'
import { StateBuilderProvider, stateBuilder } from '../../../state.builder'
import { createBoard } from '../../usecases/add-board.usecase'
import { editBoard } from '../../usecases/edit-board.usecase'
import { deleteBoard } from '../../usecases/deleteBoard.usecase'

export const createBoardFixture = (
  testStateBuilderProvider: StateBuilderProvider,
) => {
  const boardGateway = new FakeBoardGateway()
  let store: AppStore

  return {
    givenExistingBoards(
      boards: Array<{
        id: string
        name: string
        owner: string
        columns: Array<{
          id: string
          name: string
          boardId: string
        }>
      }>,
      existInState: boolean,
    ) {
      boardGateway.boards = boards
      if (existInState) {
        testStateBuilderProvider.setState((builder) =>
          builder
            .withBoards(
              boards.map((b) => ({
                id: b.id,
                name: b.name,
                owner: b.owner,
                columns: b.columns.map((c) => c.id),
              })),
            )
            .withColumns(boards.flatMap((b) => b.columns)),
        )
      }
    },
    async whenRetrievingBoards() {
      store = createTestStore(
        { boardGateway },
        testStateBuilderProvider.getState(),
      )
      await store.dispatch(getBoards())
    },
    async whenAddingNewBoard(board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    }) {
      store = createTestStore(
        { boardGateway },
        testStateBuilderProvider.getState(),
      )
      await store.dispatch(createBoard(board))
    },
    async whenEditBoard(board: {
      id: string
      name: string
      columns: Array<{ id: string; name: string }>
    }) {
      try {
        store = createTestStore(
          { boardGateway },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(editBoard(board))
      } catch (e) {}
    },
    async whenDeletingBoard(board: { id: string }) {
      try {
        store = createTestStore(
          { boardGateway },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(deleteBoard(board.id))
      } catch (e) {}
    },
    thenBoardShouldBe(
      expectedBoards: Array<{
        id: string
        name: string
        owner: string
        columns: Array<{
          id: string
          name: string
          boardId: string
        }>
      }>,
    ) {
      const state = store.getState()
      const expectedState = stateBuilder(testStateBuilderProvider.getState())
        .withBoards(
          expectedBoards.map((b) => ({
            id: b.id,
            name: b.name,
            owner: b.owner,
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
