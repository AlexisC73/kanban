import { RootState, createTestStore } from '@/lib/store'
import { FakeBoardGateway } from '../../infra/fake-board.gateway'
import { getBoards } from '../../usecases/get-boards.usecase'
import { stateBuilder } from '../../board.builder'
import { createBoard } from '../../usecases/add-board.usecase'

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
          tasks: Array<{
            id: string
            name: string
            description: string
            status: string
            subtasks: Array<{ id: string; name: string; completed: boolean }>
          }>
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
    thenBoardShouldBe(
      expectedBoards: Array<{
        id: string
        name: string
        columns: Array<{
          id: string
          name: string
          tasks: Array<{
            id: string
            name: string
            description: string
            status: string
            subtasks: Array<{ id: string; name: string; completed: boolean }>
          }>
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
              tasks: c.tasks.map((t) => t.id),
            })),
          ),
        )
        .withTasks(
          expectedBoards.flatMap((b) =>
            b.columns.flatMap((c) =>
              c.tasks.map((t) => ({
                id: t.id,
                name: t.name,
                description: t.description,
                status: t.status,
                subtasks: t.subtasks.map((s) => s.id),
              })),
            ),
          ),
        )
        .withSubtasks(
          expectedBoards.flatMap((b) =>
            b.columns.flatMap((c) =>
              c.tasks.flatMap((t) =>
                t.subtasks.map((s) => ({
                  id: s.id,
                  name: s.name,
                  completed: s.completed,
                })),
              ),
            ),
          ),
        )
        .build()
      expect(state).toEqual(expectedState)
    },
  }
}

export type BoardFixture = ReturnType<typeof createBoardFixture>
