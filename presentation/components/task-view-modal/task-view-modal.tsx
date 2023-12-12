import { useAppSelector } from '@/lib/hook'
import {
  TaskModalViewModelType,
  selectTaskModalViewModel,
} from './task-view-modal.viewmodel'
import { TaskView } from './task-view/TaskView'
import { exhaustiveGuard } from '@/lib/common/utils/exhaustiveGuard'
import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'

export const TaskViewModal = ({
  taskId,
  overlayClickAction,
}: {
  taskId: string
  overlayClickAction: () => void
}) => {
  const taskModalViewModel = useAppSelector((state) =>
    selectTaskModalViewModel(state, taskId),
  )

  const TaskNode = (() => {
    switch (taskModalViewModel.type) {
      case TaskModalViewModelType.NO_TASK:
        return null
      case TaskModalViewModelType.WITH_TASK:
        return (
          <TaskView
            closeModal={overlayClickAction}
            task={taskModalViewModel.data}
          />
        )
      default:
        return exhaustiveGuard(taskModalViewModel)
    }
  })()

  return <Overlay onClickAction={overlayClickAction}>{TaskNode}</Overlay>
}
