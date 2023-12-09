import { RootState, createTestStore } from '@/lib/store'
import { FakeTaskGateway } from '../../infra/fake-task.gateway'
import { stateBuilder } from '@/lib/state.builder'
import { addTask } from '../../usecases/add-task.usecase'
import { updateTaskStatus } from '../../usecases/update-task-column'
import { selectTasks } from '../../slices/tasks.slice'
import { selectSubtasksWithIds } from '../../slices/subtasks.slice'
import { getTasks } from '../../usecases/get-tasks.usecase'
import { updateSubtaskStatus } from '../../usecases/update-subtask-completion'

export const createTaskFixture = (
  {
    taskGateway = new FakeTaskGateway(),
  }: Partial<{ taskGateway: FakeTaskGateway }> = {},
  initialState?: RootState,
) => {
  let store = createTestStore({ taskGateway }, initialState)

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
    givenExistingState(state: RootState) {
      store = createTestStore({ taskGateway }, state)
      const tasks = selectTasks(store.getState())
      taskGateway.tasks = tasks.map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        boardId: t.boardId,
        columnId: t.columnId,
        subtasks: selectSubtasksWithIds(store.getState(), t.subtasks),
      }))
    },
    async whenRetrievingTasks() {
      return await store.dispatch(getTasks())
    },
    async whenAddingANewTask(task: {
      id: string
      name: string
      description: string
      columnId: string
      boardId: string
      subtasks: Array<{
        id: string
        name: string
        completed: boolean
        taskId: string
      }>
    }) {
      return await store.dispatch(addTask(task))
    },
    async whenUpdatingTaskStatus({
      id,
      columnId,
    }: {
      id: string
      columnId: string
    }) {
      return await store.dispatch(updateTaskStatus({ id, columnId }))
    },
    async whenUdpatingSubtaskCompletion({
      id,
      completed,
    }: {
      id: string
      completed: boolean
    }) {
      return await store.dispatch(updateSubtaskStatus({ id, completed }))
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
