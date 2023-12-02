import { createTestStore } from '@/lib/store'
import { BoardViewModelType, selectBoardViewModel } from '../board.viewmodel'
import { stateBuilder } from '@/lib/state.builder'

describe('Board view model', () => {
  it('Example: there is no boards in the store', () => {
    const store = createTestStore()

    const boardViewModel = selectBoardViewModel(store.getState(), 'boardId')

    expect(boardViewModel).toEqual({
      board: {
        type: BoardViewModelType.NO_BOARD,
      },
    })
  })

  it('Example: there is board in the store with no columns', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id-1',
            name: 'Board 1',
            columns: [],
          },
        ])
        .build(),
    )

    const boardViewModel = selectBoardViewModel(store.getState(), 'board-id-1')

    expect(boardViewModel).toEqual({
      board: {
        type: BoardViewModelType.EMPTY_BOARD,
        info: "There's no columns in this board.",
      },
    })
  })

  it('Example: there is board in the store with 2 columns', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id-1',
            name: 'Board 1',
            columns: ['column-id-1', 'column-id-2'],
          },
        ])
        .withColumns([
          {
            id: 'column-id-1',
            name: 'Column 1',
            boardId: 'board-id-1',
          },
          {
            id: 'column-id-2',
            name: 'Column 2',
            boardId: 'board-id-1',
          },
        ])
        .build(),
    )

    const boardViewModel = selectBoardViewModel(store.getState(), 'board-id-1')

    expect(boardViewModel).toEqual({
      board: {
        type: BoardViewModelType.BOARD_WITH_COLUMNS,
        data: {
          id: 'board-id-1',
          name: 'Board 1',
          columns: [
            {
              id: 'column-id-1',
              title: 'Column 1',
              tasks: [],
            },
            {
              id: 'column-id-2',
              title: 'Column 2',
              tasks: [],
            },
          ],
        },
      },
    })
  })

  it('Example: there is board in the store with 2 columns 2 tasks and 2 subtasks', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id-1',
            name: 'Board 1',
            columns: ['column-id-1', 'column-id-2'],
          },
        ])
        .withColumns([
          {
            id: 'column-id-1',
            name: 'Column 1',
            boardId: 'board-id-1',
          },
          {
            id: 'column-id-2',
            name: 'Column 2',
            boardId: 'board-id-1',
          },
        ])
        .withTasks([
          {
            id: 'task-id-1',
            name: 'Task 1',
            boardId: 'board-id-1',
            description: "Task 1's description",
            statusId: 'column-id-1',
            subtasks: [],
          },
        ])
        .build(),
    )

    const boardViewModel = selectBoardViewModel(store.getState(), 'board-id-1')

    expect(boardViewModel).toEqual({
      board: {
        type: BoardViewModelType.BOARD_WITH_COLUMNS,
        data: {
          id: 'board-id-1',
          name: 'Board 1',
          columns: [
            {
              id: 'column-id-1',
              title: 'Column 1',
              tasks: [
                {
                  id: 'task-id-1',
                  name: 'Task 1',
                  completedSubTasksAmount: 0,
                  totalSubTasksAmount: 0,
                },
              ],
            },
            {
              id: 'column-id-2',
              title: 'Column 2',
              tasks: [],
            },
          ],
        },
      },
    })
  })
})
