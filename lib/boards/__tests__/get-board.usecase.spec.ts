import { BoardFixture, createBoardFixture } from './fixture/boardFixture'

describe('Feature: Reetrieving boards', () => {
  let boardFixture: BoardFixture

  beforeEach(() => {
    boardFixture = createBoardFixture()
  })

  it('Example: Retrieving available boards when only one board exist', async () => {
    boardFixture.givenExistingBoards([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [
          {
            id: 'column-1',
            name: 'Column 1',
            tasks: [
              {
                id: 'task-1',
                name: 'Task 1',
                description: 'task 1 desc',
                status: 'column-1',
                subtasks: [
                  { id: 'subtask-1', name: 'subtask 1', completed: false },
                ],
              },
            ],
          },
        ],
      },
    ])

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [
          {
            id: 'column-1',
            name: 'Column 1',
            tasks: [
              {
                id: 'task-1',
                name: 'Task 1',
                description: 'task 1 desc',
                status: 'column-1',
                subtasks: [
                  { id: 'subtask-1', name: 'subtask 1', completed: false },
                ],
              },
            ],
          },
        ],
      },
    ])
  })

  it('Example: Retrieving available boards when multiple boards exist', async () => {
    boardFixture.givenExistingBoards([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [
          {
            id: 'column-1',
            name: 'Column 1',
            tasks: [
              {
                id: 'task-1',
                name: 'Task 1',
                description: 'task 1 desc',
                status: 'column-1',
                subtasks: [
                  { id: 'subtask-1', name: 'subtask 1', completed: false },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'board-2',
        name: 'Board 2',
        columns: [
          {
            id: 'column-2',
            name: 'Column 2',
            tasks: [
              {
                id: 'task-2',
                name: 'Task 2',
                description: 'task 2 desc',
                status: 'column-2',
                subtasks: [
                  { id: 'subtask-2', name: 'subtask 2', completed: false },
                ],
              },
            ],
          },
        ],
      },
    ])

    await boardFixture.whenRetrievingBoards()

    boardFixture.thenBoardShouldBe([
      {
        id: 'board-1',
        name: 'Board 1',
        columns: [
          {
            id: 'column-1',
            name: 'Column 1',
            tasks: [
              {
                id: 'task-1',
                name: 'Task 1',
                description: 'task 1 desc',
                status: 'column-1',
                subtasks: [
                  { id: 'subtask-1', name: 'subtask 1', completed: false },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'board-2',
        name: 'Board 2',
        columns: [
          {
            id: 'column-2',
            name: 'Column 2',
            tasks: [
              {
                id: 'task-2',
                name: 'Task 2',
                description: 'task 2 desc',
                status: 'column-2',
                subtasks: [
                  { id: 'subtask-2', name: 'subtask 2', completed: false },
                ],
              },
            ],
          },
        ],
      },
    ])
  })
})
