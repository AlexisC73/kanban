import { createStore } from '@/lib/store'
import { FakeBoardGateway } from '../../infra/fake-board.gateway'
import { getAllBoardsWithoutColums } from '../../usecases/get-all-boards.usecase'
import { selectBoard, selectBoards } from '../../slices/boards.slice'
import { createBoard } from '../../usecases/add-board.usecase'
import { getBoardById } from '../../usecases/get-board-by-id.usecase'
import { Board } from '../../model/board.entity'
import { selectColumnsWithIds } from '../../slices/column.slice'

export const createBoardFixture = () => {
  const boardGateway = new FakeBoardGateway()

  const store = createStore({
    boardGateway,
  })

  return {
    givenExistingBoards: (
      boards: Array<{
        id: string
        name: string
        columns: Array<{ id: string; name: string; tasks: string[] }>
      }>,
    ) => {
      boardGateway.boards = boards
    },
    whenRetrievingBoards: async () => {
      await store.dispatch(getAllBoardsWithoutColums())
    },
    whenCreateNewBoard: async (board: { name: string; columns: string[] }) => {
      try {
        await store.dispatch(createBoard(board))
      } catch (e) {}
    },
    whenRetrievingBooardInfoById: async ({ id }: { id: string }) => {
      try {
        await store.dispatch(getBoardById(id))
      } catch (e) {
        console.log(e)
      }
    },
    thenBoardShouldExist: (expectedBoard: {
      name: string
      columns: string[]
    }) => {
      const boards = selectBoards(store.getState())
      const board = boards.find((b) => b.name === expectedBoard.name)
      const columnsName = selectColumnsWithIds(
        store.getState(),
        board?.columns ?? [],
      ).map((c) => c.name)
      expect(board?.name).toBe(expectedBoard.name)
      expect(columnsName).toEqual(expectedBoard.columns)
    },
    thenReceivedBoardsShouldBe: (expectedBoards: Board[]) => {
      const boards = selectBoards(store.getState())
      expect(boards).toEqual(expectedBoards)
    },
    thenBoardShouldBe: (expectedBoard: Board) => {
      const board = selectBoard(store.getState(), expectedBoard.id)
      expect(board).toEqual(expectedBoard)
    },
  }
}

export type BoardFixture = ReturnType<typeof createBoardFixture>
