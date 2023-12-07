import { RootState, createTestStore } from '@/lib/store'
import { FakeTaskGateway } from '../../infra/fake-task.gateway'
import { getTasks } from '../../usecases/get-tasks.usecase'
import { stateBuilder } from '@/lib/state.builder'

export const createTaskFixture = (
  {
    taskGateway = new FakeTaskGateway(),
  }: Partial<{ taskGateway: FakeTaskGateway }> = {},
  initialState?: RootState,
) => {
  const store = createTestStore({ taskGateway }, initialState)

  return {
    givenExistingTasks(
      tasks: Array<{
        id: string
        name: string
        description: string
        boardId: string
        columnId: string
        subtasks: Array<{
          id: string
          name: string
          taskId: string
          completed: boolean
        }>
      }>,
    ) {
      taskGateway.tasks = tasks
    },
    async whenRetrievingTasks() {
      await store.dispatch(getTasks())
    },
    thenTasksShouldBe(
      expectedTasks: Array<{
        id: string
        name: string
        description: string
        boardId: string
        columnId: string
        subtasks: Array<{
          id: string
          name: string
          taskId: string
          completed: boolean
        }>
      }>,
    ) {
      const expectedState = stateBuilder()
        .withTasks(
          expectedTasks.map((t) => ({
            id: t.id,
            name: t.name,
            boardId: t.boardId,
            columnId: t.columnId,
            description: t.description,
            subtasks: t.subtasks.map((s) => s.id),
          })),
        )
        .withSubtasks(expectedTasks.flatMap((t) => t.subtasks))
        .build()
      expect(store.getState()).toEqual(expectedState)
    },
  }
}

export type TaskFixture = ReturnType<typeof createTaskFixture>
