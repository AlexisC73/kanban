import { selectBoard } from '@/lib/boards/slices/boards.slice'
import { selectColumnsWithIds } from '@/lib/boards/slices/columns.slice'
import { selectSubtasksWithIds } from '@/lib/tasks/slices/subtasks.slice'
import { selectBoardTasks } from '@/lib/tasks/slices/tasks.slice'
import { RootState } from '@/lib/store'
import { createSelector } from '@reduxjs/toolkit'

export enum BoardViewModelType {
  NO_BOARD = 'NO_BOARD',
  EMPTY_BOARD = 'EMPTY_BOARD',
  BOARD_WITH_COLUMNS = 'BOARD_WITH_COLUMNS',
}

export const selectBoardViewModel = createSelector(
  (
    state: RootState,
    boardId: string,
  ): {
    board:
      | {
          type: BoardViewModelType.NO_BOARD
        }
      | {
          type: BoardViewModelType.EMPTY_BOARD
          info: string
        }
      | {
          type: BoardViewModelType.BOARD_WITH_COLUMNS
          data: {
            id: string
            name: string
            owner: string
            columns: Array<{
              id: string
              title: string
              tasks: Array<{
                id: string
                name: string
                completedSubTasksAmount: number
                totalSubTasksAmount: number
              }>
            }>
          }
        }
  } => {
    const board = selectBoard(state, boardId)

    if (!board) {
      return {
        board: {
          type: BoardViewModelType.NO_BOARD,
        },
      }
    }

    if (board.columns.length === 0) {
      return {
        board: {
          type: BoardViewModelType.EMPTY_BOARD,
          info: "There's no columns in this board.",
        },
      }
    }

    const columns = selectColumnsWithIds(state, board.columns)
    const tasks = selectBoardTasks(state, board.id)
    const subtasks = tasks.flatMap((t) =>
      selectSubtasksWithIds(state, t.subtasks),
    )

    const returnedBoard = {
      id: board.id,
      name: board.name,
      owner: board.owner,
      columns: columns.map((c) => ({
        id: c.id,
        title: c.name,
        tasks: tasks
          .filter((t) => c.id === t.columnId)
          .map((t) => ({
            id: t.id,
            name: t.name,
            completedSubTasksAmount: subtasks.filter(
              (s) => t.subtasks.includes(s.id) && s.completed,
            ).length,
            totalSubTasksAmount: subtasks.filter((s) =>
              t.subtasks.includes(s.id),
            ).length,
          })),
      })),
    }

    return {
      board: {
        type: BoardViewModelType.BOARD_WITH_COLUMNS,
        data: returnedBoard,
      },
    }
  },
  (boardViewModel) => boardViewModel,
)
