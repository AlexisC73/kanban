import { TaskViewModal } from '@/presentation/components/task-view-modal/task-view-modal'
import { ReactNode, createContext, useState } from 'react'

interface TaskViewCtxProps {
  showTaskWithId: (taskId: string) => void
}

export const TaskViewCtx = createContext<TaskViewCtxProps>({
  showTaskWithId: (taskId: string) => {},
})

export const TaskViewProvider = ({ children }: { children: ReactNode }) => {
  const [showTaskViewModal, setShowTaskViewModal] = useState(false)
  const [taskId, setTaskId] = useState('')

  const showTaskWithId = (taskId: string) => {
    setTaskId(taskId)
    setShowTaskViewModal(true)
  }

  const closeTaskViewModal = () => {
    setShowTaskViewModal(false)
  }

  const taskViewCtx: TaskViewCtxProps = {
    showTaskWithId,
  }

  return (
    <TaskViewCtx.Provider value={taskViewCtx}>
      {showTaskViewModal && (
        <TaskViewModal
          overlayClickAction={closeTaskViewModal}
          taskId={taskId}
        />
      )}
      {children}
    </TaskViewCtx.Provider>
  )
}
