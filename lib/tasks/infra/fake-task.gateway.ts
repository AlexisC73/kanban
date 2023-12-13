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
      boardId: string
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
      boardId: string
    }>
  }) {
    this.tasks = [...this.tasks, task]
    return await Promise.resolve(task)
  }

  async updateTaskStatus(task: { id: string; columnId: string }) {
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? { ...t, columnId: task.columnId } : t,
    )
    const updatedTask = this.tasks.find((t) => t.id === task.id)
    if (!updatedTask) throw new Error('Task not found')

    return await Promise.resolve(updatedTask)
  }

  async updateSubtaskStatus(subtask: { id: string; completed: boolean }) {
    this.tasks = this.tasks.map((t) => ({
      ...t,
      subtasks: t.subtasks.map((s) =>
        s.id === subtask.id ? { ...s, completed: subtask.completed } : s,
      ),
    }))
    return await Promise.resolve(subtask)
  }

  async updateTask(task: {
    id: string
    name: string
    description: string
    boardId: string
    columnId: string
    subtasks: Array<{
      id: string
      name: string
      completed: boolean
      taskId: string
      boardId: string
    }>
  }) {
    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t))
  }
}
