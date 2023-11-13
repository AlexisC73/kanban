export const TaskCard = ({
  taskName,
  completedTask,
  totalTaskAmount
}: {
  taskName: string
  completedTask: number
  totalTaskAmount: number
}) => {
  return (
    <li className='bg-white dark:bg-Dark-Grey px-4 py-6 flex flex-col gap-y-2 rounded-lg shadow-card-task'>
      <p className='text-Black dark:text-white text-Heading-M'>{taskName}</p>
      <p className='text-Body-M text-Medium-Grey'>
        {completedTask} of {totalTaskAmount} subtasks
      </p>
    </li>
  )
}
