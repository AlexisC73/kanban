import { stateBuilder } from '@/lib/state.builder'
import { TaskFixture, createTaskFixture } from './fixture/taskFixture'

describe('Edit Task Usecase', () => {
  let taskFixture: TaskFixture

  beforeEach(() => (taskFixture = createTaskFixture()))

  test("Example: updating a task's title, description and columnId", async () => {
    taskFixture.givenExistingTasks([
      {
        id: '1',
        name: 'Old Title',
        description: 'Old Description',
        boardId: '1',
        columnId: '1',
        subtasks: [],
      },
    ])
    taskFixture.givenExistingState(
      stateBuilder()
        .withTasks([
          {
            id: '1',
            name: 'Old Title',
            description: 'Old Description',
            boardId: '1',
            columnId: '1',
            subtasks: [],
          },
        ])
        .build(),
    )

    await taskFixture.whenUpdatingTask({
      id: '1',
      name: 'New Title',
      description: 'New Description',
      boardId: '1',
      columnId: '2',
      subtasks: [],
    })

    taskFixture.thenTasksShouldBe([
      {
        id: '1',
        name: 'New Title',
        description: 'New Description',
        boardId: '1',
        columnId: '2',
        subtasks: [],
      },
    ])
  })

  test('Example: updating the subtasks of a task and deleting one subtask', async () => {
    taskFixture.givenExistingTasks([
      {
        id: '1',
        name: 'Old Title',
        description: 'Old Description',
        boardId: '1',
        columnId: '1',
        subtasks: [
          {
            id: '1',
            name: 'Subtask to delete',
            completed: true,
            taskId: '1',
            boardId: '1',
          },
          {
            id: '2',
            name: 'Subtask to keep',
            completed: false,
            taskId: '1',
            boardId: '1',
          },
        ],
      },
    ])
    taskFixture.givenExistingState(
      stateBuilder()
        .withTasks([
          {
            id: '1',
            name: 'Old Title',
            description: 'Old Description',
            boardId: '1',
            columnId: '1',
            subtasks: ['1', '2'],
          },
        ])
        .withSubtasks([
          {
            id: '1',
            name: 'Subtask to delete',
            completed: true,
            taskId: '1',
            boardId: '1',
          },
          {
            id: '2',
            name: 'Subtask to keep',
            completed: false,
            taskId: '1',
            boardId: '1',
          },
        ])
        .build(),
    )

    await taskFixture.whenUpdatingTask({
      id: '1',
      name: 'New Title',
      description: 'New Description',
      boardId: '1',
      columnId: '2',
      subtasks: [
        {
          id: '2',
          name: 'Subtask to keep and update',
          completed: true,
          taskId: '1',
          boardId: '1',
        },
      ],
    })

    taskFixture.thenTasksShouldBe([
      {
        id: '1',
        name: 'New Title',
        description: 'New Description',
        boardId: '1',
        columnId: '2',
        subtasks: [
          {
            id: '2',
            name: 'Subtask to keep and update',
            completed: true,
            taskId: '1',
            boardId: '1',
          },
        ],
      },
    ])
  })
})
