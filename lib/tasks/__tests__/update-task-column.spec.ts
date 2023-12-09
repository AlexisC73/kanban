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
            subtasks: [],
          },
        ])
        .build(),
    )

    await taskFixture.whenUpdatingTaskStatus({
      id: 'task-1',
      columnId: 'new status',
    })

    taskFixture.thenTasksShouldBe([
      {
        id: 'task-1',
        name: 'task 1',
        description: 'task 1 description',
        columnId: 'new status',
        boardId: 'board-1',
        subtasks: [],
      },
    ])
  })
})
