import { SubtaskEditItem } from './subtask-edit-item/SubtaskEditItem'

export const SubtasksEditList = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <h2 className='text-Body-M text-Medium-Grey dark:text-white'>Subtasks</h2>
      <ul className='flex flex-col gap-y-3'>
        <SubtaskEditItem />
        <SubtaskEditItem />
      </ul>
      <button className='text-Main-Purple dark:bg-white mt-1 text-Body-L font-bold bg-Main-Purple bg-opacity-10 h-10 w-full rounded-full'>
        + Add New Subtask
      </button>
    </div>
  )
}
