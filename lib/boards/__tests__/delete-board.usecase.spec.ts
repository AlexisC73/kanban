import { stateBuilder } from '../../state.builder'
import { BoardFixture, createBoardFixture } from './fixture/boardFixture'

describe('Feature: Delete a board', () => {
  let boardFixture: BoardFixture

  beforeEach(() => {
    boardFixture = createBoardFixture()
  })
  it('Example: delete a board with no columns', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'board-name',
            columns: [],
          },
        ])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [],
      },
    ])

    await boardFixture.whenDeletingBoard({
      id: 'board-id',
    })

    boardFixture.thenBoardShouldBe([])
  })

  it('Example: delete a board with columns', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'board-name',
            columns: [],
          },
        ])
        .withColumns([
          {
            id: 'column-id',
            name: 'column-name',
            boardId: 'board-id',
          },
          {
            id: 'column-id-2',
            name: 'column-name-2',
            boardId: 'board-id',
          },
        ])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [],
      },
    ])

    await boardFixture.whenDeletingBoard({
      id: 'board-id',
    })

    boardFixture.thenBoardShouldBe([])
  })

  it('Example: delete a board with columns and task with subtasks', async () => {
    boardFixture = createBoardFixture(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'board-name',
            columns: [],
          },
        ])
        .withColumns([
          {
            id: 'column-id',
            name: 'column-name',
            boardId: 'board-id',
          },
          {
            id: 'column-id-2',
            name: 'column-name-2',
            boardId: 'board-id',
          },
        ])
        .withTasks([
          {
            id: 'task-id',
            name: 'task-name',
            columnId: 'column-id',
            boardId: 'board-id',
            description: 'task-description',
            subtasks: ['subtask-id', 'subtask-id-2'],
          },
        ])
        .withSubtasks([
          {
            id: 'subtask-id',
            name: 'subtask-name',
            taskId: 'task-id',
            completed: false,
            boardId: 'board-id',
          },
          {
            id: 'subtask-id-2',
            name: 'subtask-name-2',
            taskId: 'task-id',
            completed: true,
            boardId: 'board-id',
          },
        ])
        .build(),
    )

    boardFixture.givenExistingBoards([
      {
        id: 'board-id',
        name: 'board-name',
        columns: [],
      },
    ])

    await boardFixture.whenDeletingBoard({
      id: 'board-id',
    })

    boardFixture.thenBoardShouldBe([])
  })
})
