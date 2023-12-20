import { TaskWithSubtasks } from './types'

export interface TaskGateway {
  getTasks: () => Promise<GetTasksResponse>
  createNewTask: (task: TaskWithSubtasks) => Promise<AddTaskResponse>
  updateTaskStatus: (task: {
    id: string
    columnId: string
  }) => Promise<UpdateStatusReponse>

  updateSubtaskStatus: (subtask: {
    id: string
    completed: boolean
  }) => Promise<UpdateSubtaskStatusResponse>
  updateTask: (task: TaskWithSubtasks) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
}

type GetTasksResponse = TaskWithSubtasks[]

type AddTaskResponse = TaskWithSubtasks

type UpdateStatusReponse = TaskWithSubtasks

interface UpdateSubtaskStatusResponse {
  id: string
  completed: boolean
}
