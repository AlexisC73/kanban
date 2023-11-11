import { PlusIcon } from '@/presentation/@shared/assets'

export const AddTaskButton = ({ disabled = false }: { disabled?: boolean }) => {
  return (
    <button
      disabled={disabled}
      className='px-[18px] md:px-6 h-12 bg-Main-Purple rounded-3xl text-white disabled:opacity-25'
    >
      <PlusIcon className='md:hidden' />
      <span className='hidden md:block text-Heading-M'>+ Add New Task</span>
    </button>
  )
}