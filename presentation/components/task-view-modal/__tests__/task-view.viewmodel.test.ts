import { createTestStore } from '@/lib/store'
import {
  TaskModalViewModelType,
  selectTaskModalViewModel,
} from '../task-view-modal.viewmodel'
import { stateBuilder } from '@/lib/state.builder'

describe('TaskViewViewModel', () => {
  test('Example: should return no task if no task with specified id exists', () => {
    const store = createTestStore({}, stateBuilder().withTasks([]).build())

    const foundTask = selectTaskModalViewModel(store.getState(), '1')

    expect(foundTask).toEqual({ type: TaskModalViewModelType.NO_TASK })
  })

  test('Example: should return WITH_TASK type if one task when specified id exists', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withTasks([
          {
            id: 'task-1',
            name: 'Task 1',
            boardId: 'board-1',
            columnId: 'column-1',
            description: 'Description 1',
            subtasks: [],
          },
        ])
        .build(),
    )

    const foundTask = selectTaskModalViewModel(store.getState(), 'task-1')

    expect(foundTask).toEqual({
      type: TaskModalViewModelType.WITH_TASK,
      data: {
        id: 'task-1',
        name: 'Task 1',
        boardId: 'board-1',
        columnId: 'column-1',
        description: 'Description 1',
        completedSubtasksCount: 0,
        totalSubtasksCount: 0,
        subtasks: [],
      },
    })
  })

  test('Example: should return WITH_TASK type if one task with her subtasks if specified id exists', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withTasks([
          {
            id: 'task-1',
            name: 'Task 1',
            boardId: 'board-1',
            columnId: 'column-1',
            description: 'Description 1',
            subtasks: ['sub-1', 'sub-2'],
          },
        ])
        .withSubtasks([
          {
            id: 'sub-1',
            name: 'Sub 1',
            completed: false,
            taskId: 'task-1',
          },
          {
            id: 'sub-2',
            name: 'Sub 2',
            completed: false,
            taskId: 'task-1',
          },
        ])
        .build(),
    )

    const foundTask = selectTaskModalViewModel(store.getState(), 'task-1')

    expect(foundTask).toEqual({
      type: TaskModalViewModelType.WITH_TASK,
      data: {
        id: 'task-1',
        name: 'Task 1',
        boardId: 'board-1',
        columnId: 'column-1',
        description: 'Description 1',
        completedSubtasksCount: 0,
        totalSubtasksCount: 2,
        subtasks: [
          {
            id: 'sub-1',
            name: 'Sub 1',
            completed: false,
            taskId: 'task-1',
          },
          {
            id: 'sub-2',
            name: 'Sub 2',
            completed: false,
            taskId: 'task-1',
          },
        ],
      },
    })
  })
})
