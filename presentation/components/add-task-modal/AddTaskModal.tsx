import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { TextFieldWithInput } from '../text-field-with-input/TextFieldWithInput'
import { TextareaField } from '../textarea-field/TextareaField'
import { SubtasksEditList } from '../subtask-edit-list/SubtaskEditList'
import { StatusSelect } from '../status-select/StatusSelect'
import { useState } from 'react'
import { useAppDispatch } from '@/lib/hook'
import { addTask } from '@/lib/tasks/usecases/add-task.usecase'
import { SpinnerIcon } from '@/presentation/@shared/assets'

interface TaskState {
  name: string
  description: string
  columnId: string
}

export const AddTaskModal = ({
  boardId,
  closeModal,
}: {
  boardId: string
  closeModal?: () => void
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [task, setTask] = useState<TaskState>({
    name: '',
    description: '',
    columnId: '',
  })
  const [subtasks, setSubtasks] = useState<
    Array<{ id: string; name: string; completed: boolean }>
  >([])

  const dispatch = useAppDispatch()

  const handleInformationChange = (
    name: keyof Omit<TaskState, 'subtasks'>,
    value: string,
  ) => {
    setTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (columnId: string) => {
    setTask((prev) => ({ ...prev, columnId }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const newTaskId = new Date().getTime().toString()
    dispatch(
      addTask({
        id: newTaskId,
        boardId,
        name: task.name,
        description: task.description,
        columnId: task.columnId,
        subtasks: subtasks.map((s) => ({
          id: s.id,
          name: s.name,
          completed: false,
          taskId: newTaskId,
          boardId,
        })),
      }),
    )
      .then(() => {
        setIsSubmitting(false)
        setTask({
          name: '',
          description: '',
          columnId: '',
        })
        setSubtasks([])
        closeModal?.()
      })
      .catch(() => {
        setIsSubmitting(false)
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
        <h2 className='text-Heading-L dark:text-white'>Add New Task</h2>
        <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
          <TextFieldWithInput
            onValueChange={(value) => {
              handleInformationChange('name', value)
            }}
            required
            name='title'
            value={task.name}
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
            value={task.description}
            handleValueChange={(value) => {
              handleInformationChange('description', value)
            }}
          />

          <SubtasksEditList subtasks={subtasks} setSubtasks={setSubtasks} />

          <div className='flex flex-col gap-y-2'>
            <span className='text-Body-M text-Medium-Grey dark:text-white'>
              Status
            </span>
            <StatusSelect
              boardId={boardId}
              columnId={task.columnId}
              onChange={handleStatusChange}
            />
          </div>
          <button
            type='submit'
            className='text-white text-Body-L font-bold bg-Main-Purple h-10 w-full rounded-full'
          >
            {isSubmitting ? <SpinnerIcon /> : 'Create Task'}
          </button>
        </form>
      </div>
    </Overlay>
  )
}
