import { EditTaskModal } from '@/presentation/components/edit-task-modal/EditTaskModal'
import { TaskViewModal } from '@/presentation/components/task-view-modal/task-view-modal'
import { ReactNode, createContext, useState } from 'react'

interface TaskViewCtxProps {
  showTaskWithId: (taskId: string) => void
  showEditTaskWithId: (taskId: string) => void
}

export const TaskViewCtx = createContext<TaskViewCtxProps>({
  showTaskWithId: (taskId: string) => {},
  showEditTaskWithId: (taskId: string) => {},
})

export const TaskViewProvider = ({ children }: { children: ReactNode }) => {
  const [showTaskViewModal, setShowTaskViewModal] = useState(false)
  const [taskId, setTaskId] = useState('')
  const [showEditTaskModal, setShowEditTaskModal] = useState(false)
  const [editTaskId, setEditTaskId] = useState('')

  const showTaskWithId = (taskId: string) => {
    setTaskId(taskId)
    setShowTaskViewModal(true)
  }

  const showEditTaskWithId = (taskId: string) => {
    setEditTaskId(taskId)
    setShowEditTaskModal(true)
  }

  const closeTaskViewModal = () => {
    setShowTaskViewModal(false)
  }

  const taskViewCtx: TaskViewCtxProps = {
    showTaskWithId,
    showEditTaskWithId,
  }

  return (
    <TaskViewCtx.Provider value={taskViewCtx}>
      {showTaskViewModal && (
        <TaskViewModal
          overlayClickAction={closeTaskViewModal}
          taskId={taskId}
        />
      )}
      {showEditTaskModal && (
        <EditTaskModal
          closeModal={() => {
            setShowEditTaskModal(false)
          }}
          taskId={editTaskId}
        />
      )}
      {children}
    </TaskViewCtx.Provider>
  )
}
