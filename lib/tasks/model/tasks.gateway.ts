export interface TaskGateway {
  getTasks: () => Promise<GetTasksResponse>
  createNewTask: (task: {
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
  }) => Promise<AddTaskResponse>
  updateTaskStatus: (task: {
    id: string
    columnId: string
  }) => Promise<UpdateStatusReponse>

  updateSubtaskStatus: (subtask: {
    id: string
    completed: boolean
  }) => Promise<UpdateSubtaskStatusResponse>
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
    boardId: string
  }>
}>

interface AddTaskResponse {
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
}

interface UpdateStatusReponse {
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
}

interface UpdateSubtaskStatusResponse {
  id: string
  completed: boolean
}
