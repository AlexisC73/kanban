import { VerticalMenuIcon } from '@/presentation/@shared/assets'
import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { SubtaskCheckbox } from '../subtask-checkbox/SubtaskCheckbox'
import { PropsWithChildren } from 'react'

export const TaskView = () => {
  return (
    <Overlay>
      <div className='flex flex-col mx-4 md:mx-0 md:w-[480px] bg-white dark:bg-Dark-Grey px-6 pt-6 pb-8 rounded-md gap-y-6'>
        <div className='flex items-center gap-x-4 md:gap-x-6'>
          <h1 className='text-Heading-L text-Black dark:text-white'>
            Research pricing points of various competitors and trial different
            business models
          </h1>
          <VerticalMenuIcon className='text-Medium-Grey cursor-pointer' />
        </div>
        <p className='text-Body-L text-Medium-Grey'>
          We know what we&apos;re planning to build for version one. Now we need
          to finalise the first pricing model we&apos;ll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>
        <div className='flex flex-col gap-y-4'>
          <SectionTitle>Subtasks (2 of 3)</SectionTitle>
          <ul className='flex flex-col gap-y-2'>
            <SubtaskCheckbox
              id='1'
              label='Research pricing points of various competitors and trial different business models'
              completed
              onChange={() => {
                console.log('should change')
              }}
            />
            <SubtaskCheckbox
              id='2'
              label='Outline a business model that works for our solution'
              completed
              onChange={() => {
                console.log('should change')
              }}
            />
            <SubtaskCheckbox
              id='3'
              label='Surveying and testing'
              completed={false}
              onChange={() => {
                console.log('should change')
              }}
            />
          </ul>
        </div>
        <div className='flex flex-col gap-y-2'>
          <SectionTitle>Current Status</SectionTitle>
          {/* <StatusSelect
            onChange={() => {
              console.log('should change')
            }}
          /> */}
        </div>
      </div>
    </Overlay>
  )
}

const SectionTitle = ({ children }: PropsWithChildren) => {
  return <p className='text-Body-M text-Medium-Grey'>{children}</p>
}
