import { useAppSelector } from '@/lib/hook'
import { selectTask } from '@/lib/tasks/slices/tasks.slice'
import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { TextFieldWithInput } from '../text-field-with-input/TextFieldWithInput'
import { TextareaField } from '../textarea-field/TextareaField'
import { StatusSelect } from '../status-select/StatusSelect'
import { selectSubtasksWithIds } from '@/lib/tasks/slices/subtasks.slice'
import { SubtasksEditList } from '../subtask-edit-list/SubtaskEditList'
import { FormEvent, useState } from 'react'

export const EditTaskModal = ({ taskId }: { taskId: string }) => {
  const task = useAppSelector((state) => selectTask(state, taskId))
  const subtasks = useAppSelector((state) =>
    selectSubtasksWithIds(state, task?.subtasks ?? []),
  )

  const [editedTask, setEditedTask] = useState<{
    id: string
    boardId: string
    name: string
    description: string
    columnId: string
    subtasks: string[]
  }>({
    id: task?.id ?? '',
    boardId: task?.boardId ?? '',
    name: task?.name ?? '',
    description: task?.description ?? '',
    columnId: task?.columnId ?? '',
    subtasks: task?.subtasks ?? [],
  })

  const [editedSubtasks, setEditedSubtasks] = useState<
    Array<{ id: string; completed: boolean; name: string }>
  >([
    ...subtasks.map((s) => ({
      id: s.id,
      name: s.name,
      completed: s.completed,
    })),
  ])

  if (!task) return null

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    console.log('submit')
  }

  return (
    <Overlay>
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className='bg-white dark:bg-Dark-Grey p-6 flex flex-col gap-y-6 w-full mx-4 rounded-md md:w-[480px]'
      >
        <h2 className='text-Heading-L dark:text-white'>Edit Task</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-6'>
          <TextFieldWithInput
            onValueChange={(value) => {
              setEditedTask((prev) => ({ ...prev, name: value }))
            }}
            name='title'
            value={editedTask.name}
            label='Title'
            placeholder='e.g. Take coffee break'
          />
          <TextareaField
            label='Description'
            name='description'
            placeholder='e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little.'
            rows={4}
            value={editedTask.description}
            handleValueChange={(value) => {
              setEditedTask((prev) => ({ ...prev, description: value }))
            }}
          />
          <SubtasksEditList
            subtasks={editedSubtasks}
            setSubtasks={setEditedSubtasks}
          />
          <div className='flex flex-col gap-y-2'>
            <span className='text-Body-M text-Medium-Grey dark:text-white'>
              Status
            </span>
            <StatusSelect
              boardId={editedTask.boardId}
              columnId={editedTask.columnId}
              onChange={() => {
                console.log('change status')
              }}
            />
          </div>
          <button className='w-full bg-Main-Purple text-white text-Body-L font-bold py-2 rounded-full'>
            Save Changes
          </button>
        </form>
      </div>
    </Overlay>
  )
}
