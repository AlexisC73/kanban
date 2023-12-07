export interface TaskGateway {
  getTasks: () => Promise<GetTasksResponse>
}

type GetTasksResponse = Array<{
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
