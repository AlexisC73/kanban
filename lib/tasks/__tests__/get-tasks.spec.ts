import { TaskFixture, createTaskFixture } from './fixture/taskFixture'

describe('Feature: Get tasks', () => {
  let taskFixture: TaskFixture

  beforeEach(() => {
    taskFixture = createTaskFixture()
  })

  test('Example: when retrieving all tasks', async () => {
    taskFixture.givenExistingTasks([
      {
        id: 'task-1',
        name: 'task 1',
        description: 'task 1 description',
        columnId: 'todo',
        boardId: 'board-1',
        subtasks: [],
      },
    ])

    await taskFixture.whenRetrievingTasks()

    taskFixture.thenTasksShouldBe([
      {
        id: 'task-1',
        name: 'task 1',
        description: 'task 1 description',
        columnId: 'todo',
        boardId: 'board-1',
        subtasks: [],
      },
    ])
  })

  test('Example: when retrieving all tasks with her subtasks', async () => {
    taskFixture.givenExistingTasks([
      {
        id: 'task-1',
        name: 'task 1',
        description: 'task 1 description',
        columnId: 'todo',
        boardId: 'board-1',
        subtasks: [
          {
            id: 'subtask-1',
            name: 'Subtask 1',
            completed: false,
            taskId: 'task-1',
          },
          {
            id: 'subtask-2',
            name: 'Subtask 2',
            completed: true,
            taskId: 'task-1',
          },
        ],
      },
    ])

    await taskFixture.whenRetrievingTasks()

    taskFixture.thenTasksShouldBe([
      {
        id: 'task-1',
        name: 'task 1',
        description: 'task 1 description',
        columnId: 'todo',
        boardId: 'board-1',
        subtasks: [
          {
            id: 'subtask-1',
            name: 'Subtask 1',
            completed: false,
            taskId: 'task-1',
          },
          {
            id: 'subtask-2',
            name: 'Subtask 2',
            completed: true,
            taskId: 'task-1',
          },
        ],
      },
    ])
  })
})
