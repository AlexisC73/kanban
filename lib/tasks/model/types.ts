import { Subtask } from './sutasks.entity'
import { Task } from './tasks.entity'

export type TaskWithSubtasks = Omit<Task, 'subtasks'> & { subtasks: Subtask[] }
