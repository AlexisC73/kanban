import { ArrowDownIcon } from '@/presentation/@shared/assets'
import { ReactNode, useState } from 'react'
import {
  StatusModelType,
  selectStatusViewModelForBoard,
} from './status-select.viewmodel'
import { useAppSelector } from '@/lib/hook'
import { exhaustiveGuard } from '@/lib/common/utils/exhaustiveGuard'
import { selectColumnName } from '@/lib/boards/slices/columns.slice'

export const StatusSelect = ({
  boardId,
  onChange,
  columnId,
}: {
  boardId: string
  onChange: (newValue: string) => void
  columnId: string
}) => {
  const [open, setOpen] = useState(false)
  const toggleOpenSelect = () => {
    setOpen((prev) => !prev)
  }

  const columnName = useAppSelector((state) =>
    selectColumnName(state, columnId),
  )

  const handleChangeStatus = (newValue: string) => {
    onChange(newValue)
    setOpen(false)
  }

  const statusViewModel = useAppSelector((state) =>
    selectStatusViewModelForBoard(state, { boardId }),
  )

  const StatusNode: ReactNode = (() => {
    switch (statusViewModel.type) {
      case StatusModelType.NO_COLUMN:
        return null
      case StatusModelType.WITH_COLUMNS:
        return statusViewModel.data.map((status) => (
          <StatusSelector
            key={status.id}
            id={status.id}
            name={status.name}
            setSelected={handleChangeStatus}
          />
        ))
      default:
        return exhaustiveGuard(statusViewModel)
    }
  })()

  return (
    <div className='relative text-Body-L'>
      <div
        onClick={toggleOpenSelect}
        className={
          'bg-white dark:bg-Dark-Grey text-Black dark:text-white flex justify-between px-4 h-10 w-full items-center rounded-[4px] border-[1px] border-Medium-Grey border-opacity-25 cursor-pointer' +
          `${open ? ' border-Main-Purple border-opacity-100' : ''}`
        }
      >
        <p>{columnName}</p>
        <ArrowDownIcon className='text-Main-Purple' />
      </div>
      {open && (
        <ul
          onMouseLeave={() => {
            setOpen(false)
          }}
          className='z-50 absolute top-12 left-0 right-0 bg-white dark:bg-Dark-Grey p-4 rounded-lg flex flex-col gap-y-2 text-Medium-Grey shadow-dropdown-shadow'
        >
          {StatusNode}
        </ul>
      )}
    </div>
  )
}

const StatusSelector = ({
  id,
  name,
  setSelected,
}: {
  id: string
  name: string
  setSelected: (id: string) => void
}) => {
  const handleClick = () => {
    setSelected(id)
  }
  return (
    <li onClick={handleClick} className='cursor-pointer'>
      {name}
    </li>
  )
}
