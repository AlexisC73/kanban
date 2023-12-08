import { TaskGateway } from '../model/tasks.gateway'

export class FakeTaskGateway implements TaskGateway {
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
  }> = []

  async getTasks() {
    return this.tasks
  }

  async createNewTask(task: {
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
    this.tasks = [...this.tasks, task]
    return await Promise.resolve(task)
  }
}
