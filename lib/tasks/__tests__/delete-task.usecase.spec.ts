import { stateBuilder } from '@/lib/state.builder'
import { TaskFixture, createTaskFixture } from './fixture/taskFixture'

describe('Feature: Delete task', () => {
  let taskFixture: TaskFixture

  beforeEach(() => {
    taskFixture = createTaskFixture()
  })
  test('Example: When deleting a task with subtasks', async () => {
    taskFixture.givenExistingState(
      stateBuilder()
        .withTasks([
          {
            id: '1',
            name: 'title',
            description: 'description',
            columnId: 'col-1',
            boardId: 'board-1',
            subtasks: ['subtask-1'],
          },
          {
            id: '2',
            name: 'title 2',
            description: 'description 2',
            columnId: 'col-2',
            boardId: 'board-1',
            subtasks: ['subtask-2'],
          },
        ])
        .withSubtasks([
          {
            id: 'subtask-1',
            name: 'subtask 1',
            completed: false,
            taskId: '1',
            boardId: 'board-1',
          },
          {
            id: 'subtask-2',
            name: 'subtask 2',
            completed: true,
            taskId: '2',
            boardId: 'board-1',
          },
        ])
        .build(),
    )

    await taskFixture.whenDeletingTask({ taskId: '1' })

    taskFixture.thenTasksShouldBe([
      {
        id: '2',
        name: 'title 2',
        description: 'description 2',
        columnId: 'col-2',
        boardId: 'board-1',
        subtasks: [
          {
            id: 'subtask-2',
            name: 'subtask 2',
            completed: true,
            taskId: '2',
            boardId: 'board-1',
          },
        ],
      },
    ])
  })

  test('Example: When adding new task with subtasks and one task exist', async () => {
    taskFixture.givenExistingState(
      stateBuilder()
        .withTasks([
          {
            id: '1',
            name: 'title',
            description: 'description',
            columnId: 'col-1',
            boardId: 'board-1',
            subtasks: ['subtask-1'],
          },
        ])
        .withSubtasks([
          {
            id: 'subtask-1',
            name: 'subtask 1',
            completed: false,
            taskId: '1',
            boardId: 'board-1',
          },
        ])
        .build(),
    )

    await taskFixture.whenAddingANewTask({
      id: '2',
      name: 'title 2',
      description: 'description 2',
      columnId: 'col-1',
      boardId: 'board-1',
      subtasks: [
        {
          id: 'subtask-1',
          name: 'subtask 1',
          completed: false,
          taskId: '2',
          boardId: 'board-1',
        },
      ],
    })

    taskFixture.thenTasksShouldBe([
      {
        id: '1',
        name: 'title',
        description: 'description',
        columnId: 'col-1',
        boardId: 'board-1',
        subtasks: [
          {
            id: 'subtask-1',
            name: 'subtask 1',
            completed: false,
            taskId: '1',
            boardId: 'board-1',
          },
        ],
      },
      {
        id: '2',
        name: 'title 2',
        description: 'description 2',
        columnId: 'col-1',
        boardId: 'board-1',
        subtasks: [
          {
            id: 'subtask-1',
            name: 'subtask 1',
            completed: false,
            taskId: '2',
            boardId: 'board-1',
          },
        ],
      },
    ])
  })
})
