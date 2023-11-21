import { createStore } from '@/lib/store'
import { FakeBoardGateway } from '../../infra/fake-board.gateway'
import { getAllBoards } from '../../usecases/get-all-boards.usecase'
import { selectAllBoards, selectBoardByName } from '../../slices/boards.slice'
import { createBoard } from '../../usecases/add-board.usecase'

export const createBoardFixture = () => {
  const boardGateway = new FakeBoardGateway()

  const store = createStore({
    boardGateway
  })

  return {
    givenExistingBoards: (boards: { id: string; name: string }[]) => {
      boardGateway.boards = boards
    },
    whenRetrievingBoards: async () => {
      await store.dispatch(getAllBoards())
    },
    whenCreateNewBoard: async (board: { name: string }) => {
      await store.dispatch(createBoard(board))
    },
    thenBoardShouldExist: (expectedBoard: { name: string }) => {
      const boards = selectAllBoards(store.getState())
      expect(boards.findIndex(b => b.name === expectedBoard.name)).not.toBe(-1)
    },
    thenReceivedBoardsNameShouldBe: (
      expectedBoards: { id: string; name: string }[]
    ) => {
      const boards = selectAllBoards(store.getState())
      expect(boards).toEqual(expectedBoards)
    }
  }
}

export type BoardFixture = ReturnType<typeof createBoardFixture>
