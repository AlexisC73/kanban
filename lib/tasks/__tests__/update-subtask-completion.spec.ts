import { stateBuilder } from '@/lib/state.builder'
import { TaskFixture, createTaskFixture } from './fixture/taskFixture'

describe('Feature: Update task status', () => {
  let taskFixture: TaskFixture

  beforeEach(() => {
    taskFixture = createTaskFixture()
  })

  test('Example: when updating task status', async () => {
    taskFixture.givenExistingState(
      stateBuilder()
        .withTasks([
          {
            id: 'task-1',
            name: 'task 1',
            description: 'task 1 description',
            columnId: 'todo',
            boardId: 'board-1',
            subtasks: ['subtask-1', 'subtask-2'],
          },
        ])
        .withSubtasks([
          {
            id: 'subtask-1',
            name: 'subtask 1',
            completed: false,
            taskId: 'task-1',
            boardId: 'board-1',
          },
          {
            id: 'subtask-2',
            name: 'subtask 2',
            completed: false,
            taskId: 'task-1',
            boardId: 'board-1',
          },
        ])
        .build(),
    )

    await taskFixture.whenUdpatingSubtaskCompletion({
      id: 'subtask-1',
      completed: true,
    })

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
            name: 'subtask 1',
            completed: true,
            taskId: 'task-1',
            boardId: 'board-1',
          },
          {
            id: 'subtask-2',
            name: 'subtask 2',
            completed: false,
            taskId: 'task-1',
            boardId: 'board-1',
          },
        ],
      },
    ])
  })
})
