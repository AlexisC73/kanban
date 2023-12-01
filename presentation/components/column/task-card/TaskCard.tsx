export interface TaskCardProps {
  name: string
  completedSubTasksAmount: number
  totalSubTasksAmount: number
}

export const TaskCard = ({
  name,
  completedSubTasksAmount,
  totalSubTasksAmount,
}: TaskCardProps) => {
  return (
    <li className='bg-white dark:bg-Dark-Grey px-4 py-6 flex flex-col gap-y-2 rounded-lg shadow-card-task'>
      <p className='text-Black dark:text-white text-Heading-M'>{name}</p>
      <p className='text-Body-M text-Medium-Grey'>
        {completedSubTasksAmount} of {totalSubTasksAmount} subtasks
      </p>
    </li>
  )
}
