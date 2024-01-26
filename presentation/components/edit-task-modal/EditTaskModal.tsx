import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { selectTask } from '@/lib/tasks/slices/tasks.slice'
import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { TextFieldWithInput } from '../text-field-with-input/TextFieldWithInput'
import { TextareaField } from '../textarea-field/TextareaField'
import { StatusSelect } from '../status-select/StatusSelect'
import { selectSubtasksWithIds } from '@/lib/tasks/slices/subtasks.slice'
import { SubtasksEditList } from '../subtask-edit-list/SubtaskEditList'
import { FormEvent, useState } from 'react'
import { updateTask } from '@/lib/tasks/usecases/update-task.usecase'

export const EditTaskModal = ({
  taskId,
  closeModal,
}: {
  taskId: string
  closeModal: () => void
}) => {
  const task = useAppSelector((state) => selectTask(state, taskId))
  const dispatch = useAppDispatch()
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

  const handleUpdateStatus = (status: string) => {
    setEditedTask((prev) => ({ ...prev, columnId: status }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    dispatch(
      updateTask({
        ...editedTask,
        subtasks: editedSubtasks.map((s) => ({
          boardId: editedTask.boardId,
          taskId: editedTask.id,
          id: s.id,
          name: s.name,
          completed: s.completed,
        })),
      }),
    ).then(() => {
      closeModal()
    })
  }

  return (
    <Overlay onClickAction={closeModal}>
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
            required
            name='title'
            value={editedTask.name}
            label='Title'
            placeholder='e.g. Take coffee break'
          />
          <TextareaField
            label='Description'
            name='description'
            required
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
              onChange={handleUpdateStatus}
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
