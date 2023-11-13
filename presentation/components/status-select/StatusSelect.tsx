import { ArrowDownIcon } from '@/presentation/@shared/assets'
import { useState } from 'react'

export const StatusSelect = ({
  defaultValue,
  onChange
}: {
  defaultValue: string
  onChange: (newValue: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const toggleOpenSelect = () => setOpen(prev => !prev)

  const handleChangeState = (newValue: string) => {
    onChange(newValue)
    setOpen(false)
  }

  return (
    <div className='relative text-Body-L'>
      <div
        onClick={toggleOpenSelect}
        className={
          'bg-white dark:bg-Dark-Grey text-Black dark:text-white flex justify-between px-4 h-10 w-full items-center rounded-[4px] border-[1px] border-Medium-Grey border-opacity-25 cursor-pointer' +
          `${open ? ' border-Main-Purple border-opacity-100' : ''}`
        }
      >
        <p>{defaultValue}</p>
        <ArrowDownIcon className='text-Main-Purple' />
      </div>
      {open && (
        <ul
          onMouseLeave={() => setOpen(false)}
          className='z-50 absolute top-12 left-0 right-0 bg-white dark:bg-Dark-Grey p-4 rounded-lg flex flex-col gap-y-2 text-Medium-Grey shadow-dropdown-shadow'
        >
          <li
            onClick={() => {
              handleChangeState('Todo')
            }}
            className='cursor-pointer'
          >
            Todo
          </li>
          <li
            onClick={() => {
              handleChangeState('Doing')
            }}
            className='cursor-pointer'
          >
            Doing
          </li>
          <li
            onClick={() => {
              handleChangeState('Done')
            }}
            className='cursor-pointer'
          >
            Done
          </li>
        </ul>
      )}
    </div>
  )
}
