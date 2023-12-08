import { TaskViewCtx } from '@/context/task-view/TaskViewCtx'
import { useContext } from 'react'

export interface TaskCardProps {
  name: string
  completedSubTasksAmount: number
  totalSubTasksAmount: number
  id: string
}

export const TaskCard = ({
  name,
  completedSubTasksAmount,
  totalSubTasksAmount,
  id,
}: TaskCardProps) => {
  const { showTaskWithId } = useContext(TaskViewCtx)
  const handleClick = () => {
    showTaskWithId(id)
  }
  return (
    <li
      onClick={handleClick}
      className='bg-white dark:bg-Dark-Grey px-4 py-6 flex flex-col gap-y-2 rounded-lg shadow-card-task cursor-pointer'
    >
      <p className='text-Black dark:text-white text-Heading-M'>{name}</p>
      <p className='text-Body-M text-Medium-Grey'>
        {completedSubTasksAmount} of {totalSubTasksAmount} subtasks
      </p>
    </li>
  )
}
