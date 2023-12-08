import { CircleIcon } from '@/presentation/@shared/assets'
import { TaskCard, TaskCardProps } from './task-card/TaskCard'

export interface ColumnProps {
  title: string
  tasks: Array<{ id: string } & TaskCardProps>
}

export const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div className='w-[280px] min-w-[280px] flex flex-col gap-y-6'>
      <h2 className='uppercase flex gap-x-3 items-center text-Heading-S text-Medium-Grey'>
        <CircleIcon className='text-[#49C4E5] text-[15px]' />
        {title} ({tasks.length})
      </h2>
      <ul className='flex flex-col gap-y-5'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            completedSubTasksAmount={task.completedSubTasksAmount}
            totalSubTasksAmount={task.totalSubTasksAmount}
            name={task.name}
          />
        ))}
      </ul>
    </div>
  )
}
