import { createStore } from '@/lib/store'
import { FakeBoardGateway } from '../../infra/fake-board.gateway'
import { getAllBoardsWithoutColums } from '../../usecases/get-all-boards.usecase'
import { selectAllBoards, selectBoardById } from '../../slices/boards.slice'
import { createBoard } from '../../usecases/add-board.usecase'
import { getBoardById } from '../../usecases/get-board-by-id.usecase'

export const createBoardFixture = () => {
  const boardGateway = new FakeBoardGateway()

  const store = createStore({
    boardGateway
  })

  return {
    givenExistingBoards: (
      boards: { id: string; name: string; columns: string[] }[]
    ) => {
      boardGateway.boards = boards
    },
    whenRetrievingBoards: async () => {
      await store.dispatch(getAllBoardsWithoutColums())
    },
    whenCreateNewBoard: async (board: { name: string }) => {
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
    thenBoardShouldExist: (expectedBoard: { name: string }) => {
      const boards = selectAllBoards(store.getState())
      expect(boards.findIndex(b => b.name === expectedBoard.name)).not.toBe(-1)
    },
    thenReceivedBoardsShouldBe: (
      expectedBoards: { id: string; name: string; columns: string[] }[]
    ) => {
      const boards = selectAllBoards(store.getState())
      expect(boards).toEqual(expectedBoards)
    },
    thenBoardShouldBe: (expectedBoard: {
      id: string
      name: string
      columns: string[]
    }) => {
      const board = selectBoardById(store.getState(), expectedBoard.id)
      expect(board).toEqual(expectedBoard)
    }
  }
}

export type BoardFixture = ReturnType<typeof createBoardFixture>
