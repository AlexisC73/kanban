import { TaskGateway } from '../model/tasks.gateway'

export class FakeTaskGateway implements TaskGateway {
  tasks!: Array<{
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
  }>

  async getTasks() {
    return this.tasks
  }
}
