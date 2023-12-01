import { createStore } from '@/lib/store'
import { FakeBoardGateway } from '../infra/fake-board.gateway'
import { stateBuilder } from '../board.builder'
import { getBoards } from '../usecases/get-boards.usecase'

describe('Feature: Reetrieving boards', () => {
  it('Example: Retrieving available boards when only one board exist', async () => {
    givenExistingBoards([
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

    await whenRetrievingBoards()

    thenBoardShouldBe([
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
    givenExistingBoards([
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

    await whenRetrievingBoards()

    thenBoardShouldBe([
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

const boardGateway = new FakeBoardGateway()

const store = createStore({ boardGateway })

function givenExistingBoards(
  boards: Array<{
    id: string
    name: string
    columns: Array<{
      id: string
      name: string
      tasks: Array<{
        id: string
        name: string
        description: string
        status: string
        subtasks: Array<{ id: string; name: string; completed: boolean }>
      }>
    }>
  }>,
) {
  boardGateway.boards = boards
}

async function whenRetrievingBoards() {
  await store.dispatch(getBoards())
}

function thenBoardShouldBe(
  expectedBoards: Array<{
    id: string
    name: string
    columns: Array<{
      id: string
      name: string
      tasks: Array<{
        id: string
        name: string
        description: string
        status: string
        subtasks: Array<{ id: string; name: string; completed: boolean }>
      }>
    }>
  }>,
) {
  const state = store.getState()
  const expectedState = stateBuilder()
    .withBoards(
      expectedBoards.map((b) => ({
        id: b.id,
        name: b.name,
        columns: b.columns.map((c) => c.id),
      })),
    )
    .withColumns(
      expectedBoards.flatMap((b) =>
        b.columns.map((c) => ({
          id: c.id,
          name: c.name,
          tasks: c.tasks.map((t) => t.id),
        })),
      ),
    )
    .withTasks(
      expectedBoards.flatMap((b) =>
        b.columns.flatMap((c) =>
          c.tasks.map((t) => ({
            id: t.id,
            name: t.name,
            description: t.description,
            status: t.status,
            subtasks: t.subtasks.map((s) => s.id),
          })),
        ),
      ),
    )
    .withSubtasks(
      expectedBoards.flatMap((b) =>
        b.columns.flatMap((c) =>
          c.tasks.flatMap((t) =>
            t.subtasks.map((s) => ({
              id: s.id,
              name: s.name,
              completed: s.completed,
            })),
          ),
        ),
      ),
    )
    .build()
  expect(state).toEqual(expectedState)
}
