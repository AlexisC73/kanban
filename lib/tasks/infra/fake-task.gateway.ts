import { TaskGateway } from '../model/tasks.gateway'
import { TaskWithSubtasks } from '../model/types'

export class FakeTaskGateway implements TaskGateway {
  tasks: TaskWithSubtasks[] = []

  async getTasks() {
    return this.tasks
  }

  async createNewTask(task: TaskWithSubtasks) {
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

  async updateTask(task: TaskWithSubtasks) {
    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t))
  }

  async deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId)
  }
}
