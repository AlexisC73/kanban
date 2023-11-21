import { CircleIcon } from '@/presentation/@shared/assets'
import { TaskCard } from './task-card/TaskCard'

export const Column = ({ title }: { title: string }) => {
  return (
    <div className='w-[280px] min-w-[280px] flex flex-col gap-y-6'>
      <h2 className='uppercase flex gap-x-3 items-center text-Heading-S text-Medium-Grey'>
        <CircleIcon className='text-[#49C4E5] text-[15px]' />
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
          completedTask={2}
          totalTaskAmount={5}
        />
      </ul>
    </div>
  )
}
