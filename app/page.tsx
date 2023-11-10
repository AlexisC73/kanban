'use client'

import { CircleIcon } from '@/presentation/@shared/assets'

export default function Home () {
  return (
    <main className='flex gap-x-6 p-4 py-6 md:px-6'>
      <Column title='TODO' />
      <Column title='DOING' />
      <Column title='DONE' />
    </main>
  )
}

export const Column = ({ title }: { title: string }) => {
  return (
    <div className='w-[280px] min-w-[280px] flex flex-col gap-y-6'>
      <h2 className='uppercase flex gap-x-3 items-center text-Heading-S text-Medium-Grey'>
        <CircleIcon className='text-[#49C4E5]' />
        {title} (4)
      </h2>
      <ul className='flex flex-col gap-y-5'>
        <TaskCard
          taskName='Build UI for onboarding flow'
          completedTask={0}
          totalTaskAmount={3}
        />
        <TaskCard
          taskName='Research pricing points of various competitors and trial different business models'
          completedTask={0}
          totalTaskAmount={3}
        />
      </ul>
    </div>
  )
}

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
