import { TaskViewCtx } from '@/context/task-view/TaskViewCtx'
import { VerticalMenuIcon } from '@/presentation/@shared/assets'
import { useContext, useState } from 'react'

export default function OptionMenu({
  taskId,
  onActionClick,
}: {
  taskId: string
  onActionClick?: () => void
}) {
  const [showMenuList, setShowMenuList] = useState(false)

  const toggleMenuList = () => {
    setShowMenuList((prev) => !prev)
  }

  return (
    <div className='flex items-center justify-center relative'>
      <VerticalMenuIcon
        onClick={toggleMenuList}
        className='text-Medium-Grey cursor-pointer'
      />
      {showMenuList && (
        <OptionMenuList
          taskId={taskId}
          onActionClick={() => {
            onActionClick?.()
          }}
          closeMenuList={() => {
            setShowMenuList(false)
          }}
        />
      )}
    </div>
  )
}

const OptionMenuList = ({
  closeMenuList,
  taskId,
  onActionClick,
}: {
  closeMenuList: () => void
  taskId: string
  onActionClick?: () => void
}) => {
  const { showEditTaskWithId } = useContext(TaskViewCtx)

  const handleEditBoard = () => {
    closeMenuList()
    onActionClick?.()
    showEditTaskWithId(taskId)
  }

  const handleMouseLeave = () => {
    closeMenuList()
  }

  return (
    <ul
      onMouseLeave={handleMouseLeave}
      className='absolute top-10 right-0 bg-white dark:bg-Dark-Grey p-4 flex flex-col gap-y-4 w-[192px] rounded-lg'
    >
      <li onClick={handleEditBoard} className='text-Medium-Grey cursor-pointer'>
        Edit Task
      </li>
      <li className='text-Red cursor-pointer'>Delete Task</li>
    </ul>
  )
}
