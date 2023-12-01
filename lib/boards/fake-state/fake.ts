import { stateBuilder } from '../board.builder'

export const fakeState = stateBuilder()
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
      tasks: ['task-id-2'],
    },
    {
      id: 'column-id-2',
      name: 'Column 2',
      tasks: ['task-id-1'],
    },
  ])
  .withTasks([
    {
      id: 'task-id-1',
      name: 'Task 1',
      description: 'Task 1 description',
      status: 'TODO',
      subtasks: ['subtask-id-1', 'subtask-id-2'],
    },
    {
      id: 'task-id-2',
      name: 'Task 2',
      description: 'Task 2 description',
      status: 'TODO',
      subtasks: ['subtask-id-3', 'subtask-id-4'],
    },
  ])
  .withSubtasks([
    {
      id: 'subtask-id-1',
      name: 'Subtask 1',
      completed: false,
    },
    {
      id: 'subtask-id-2',
      name: 'Subtask 2',
      completed: false,
    },
    {
      id: 'subtask-id-3',
      name: 'Subtask 3',
      completed: true,
    },
    {
      id: 'subtask-id-4',
      name: 'Subtask 4',
      completed: false,
    },
  ])
  .build()
