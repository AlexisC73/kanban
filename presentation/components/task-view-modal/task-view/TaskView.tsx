import { VerticalMenuIcon } from '@/presentation/@shared/assets'
import { SubtaskCheckbox } from '../../subtask-checkbox/SubtaskCheckbox'
import { PropsWithChildren } from 'react'
import { StatusSelect } from '../../status-select/StatusSelect'
import { useAppDispatch } from '@/lib/hook'
import { updateTaskStatus } from '@/lib/tasks/usecases/update-task-column'
import { updateSubtaskStatus } from '@/lib/tasks/usecases/update-subtask-completion'

export interface TaskViewProps {
  task: {
    id: string
    description: string
    name: string
    boardId: string
    columnId: string
    completedSubtasksCount: number
    totalSubtasksCount: number
    subtasks: Array<{
      id: string
      name: string
      completed: boolean
      taskId: string
    }>
  }
}

export const TaskView = ({ task }: TaskViewProps) => {
  const dispatch = useAppDispatch()
  const hanleStatusChange = (newStatus: string) => {
    dispatch(updateTaskStatus({ id: task.id, columnId: newStatus }))
  }

  const handleUpdateSubtaskCompletion = (
    subtaskId: string,
    completed: boolean,
  ) => {
    dispatch(updateSubtaskStatus({ id: subtaskId, completed }))
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
      className='flex flex-col mx-4 md:mx-0 md:w-[480px] bg-white dark:bg-Dark-Grey px-6 pt-6 pb-8 rounded-md gap-y-6'
    >
      <div className='flex items-center gap-x-4 md:gap-x-6'>
        <h1 className='text-Heading-L flex-1 text-Black dark:text-white'>
          {task.name}
        </h1>
        <VerticalMenuIcon className='text-Medium-Grey cursor-pointer' />
      </div>
      <p className='text-Body-L text-Medium-Grey'>{task.description}</p>
      <div className='flex flex-col gap-y-4'>
        <SectionTitle>
          Subtasks ({task.completedSubtasksCount} of {task.totalSubtasksCount})
        </SectionTitle>
        <ul className='flex flex-col gap-y-2'>
          {task.subtasks.map((subtask) => (
            <SubtaskCheckbox
              key={subtask.id}
              id={subtask.id}
              label={subtask.name}
              completed={subtask.completed}
              onChange={() => {
                handleUpdateSubtaskCompletion(subtask.id, !subtask.completed)
              }}
            />
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-y-2'>
        <SectionTitle>Current Status</SectionTitle>
        <StatusSelect
          boardId={task.boardId}
          columnId={task.columnId}
          onChange={hanleStatusChange}
        />
      </div>
    </div>
  )
}

const SectionTitle = ({ children }: PropsWithChildren) => {
  return <p className='text-Body-M text-Medium-Grey'>{children}</p>
}
