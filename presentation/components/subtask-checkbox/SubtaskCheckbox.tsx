import { CheckBox } from '../checkbox/checkbox'

export function SubtaskCheckbox ({
  label,
  id,
  completed,
  onChange
}: {
  label: string
  id: string
  completed: boolean
  onChange: () => void
}) {
  return (
    <div className='flex w-full bg-Light-Grey dark:bg-Very-Dark-Grey dark:hover:bg-Main-Purple dark:hover:bg-opacity-25 hover:bg-Main-Purple rounded-[4px] hover:bg-opacity-25 items-center px-3 py-4 gap-x-4 text-Body-M'>
      <CheckBox name={id} checked={completed} onChange={onChange} />
      <label
        htmlFor={id}
        className={`${
          completed
            ? 'line-through text-opacity-50 dark:text-opacity-50'
            : 'no-underline'
        } text-Black dark:text-white flex-1 cursor-pointer`}
      >
        {label}
      </label>
    </div>
  )
}
