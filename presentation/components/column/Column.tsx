import { CircleIcon } from '@/presentation/@shared/assets'
import { TaskCard, TaskCardProps } from './task-card/TaskCard'
import { useAppDispatch } from '@/lib/hook'
import { updateTaskStatus } from '@/lib/tasks/usecases/update-task-column'
import { useRef, useState } from 'react'

export interface ColumnProps {
  id: string
  title: string
  tasks: Array<{ id: string } & TaskCardProps>
}

export const Column = ({ title, tasks, id }: ColumnProps) => {
  const columnRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const dispatch = useAppDispatch()
  const handleOnDrop = (e: React.DragEvent<HTMLUListElement>) => {
    const taskId = e.dataTransfer.getData('task-id')
    dispatch(updateTaskStatus({ id: taskId, columnId: id }))
    setDragging(false)
  }

  const handleDrapOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault()
    setDragging(false)
  }

  return (
    <div className='w-[280px] min-w-[280px] flex flex-col gap-y-6'>
      <h2 className='uppercase flex gap-x-3 items-center text-Heading-S text-Medium-Grey'>
        <CircleIcon className='text-[#49C4E5] text-[15px]' />
        {title} ({tasks.length})
      </h2>
      <ul
        onDrop={handleOnDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDrapOver}
        ref={columnRef}
        className={`flex flex-col h-full gap-y-5 rounded-[6px] ${
          dragging ? 'bg-Medium-Grey bg-opacity-10' : ''
        }`}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            completedSubTasksAmount={task.completedSubTasksAmount}
            totalSubTasksAmount={task.totalSubTasksAmount}
            name={task.name}
          />
        ))}
      </ul>
    </div>
  )
}
