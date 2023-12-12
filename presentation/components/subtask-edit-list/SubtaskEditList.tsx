import { SetStateAction, Dispatch } from 'react'
import { SubtaskEditItem } from './subtask-edit-item/SubtaskEditItem'

export const SubtasksEditList = ({
  subtasks,
  setSubtasks,
}: {
  subtasks: Array<{
    id: string
    name: string
    completed: boolean
  }>
  setSubtasks: Dispatch<
    SetStateAction<Array<{ id: string; name: string; completed: boolean }>>
  >
}) => {
  const handleAddSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      { id: new Date().getTime().toString(), name: '', completed: false },
    ])
  }

  const handleDeleteSubtask = (id: string) => {
    setSubtasks((prev) => prev.filter((s) => s.id !== id))
  }

  const handleSubtaskNameChange = (id: string, name: string) => {
    setSubtasks((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)))
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <h2 className='text-Body-M text-Medium-Grey dark:text-white'>Subtasks</h2>
      <ul className='flex flex-col gap-y-3'>
        {subtasks.map((s) => (
          <SubtaskEditItem
            key={s.id}
            onNameChange={handleSubtaskNameChange}
            id={s.id}
            name={s.name}
            deleteSubtask={handleDeleteSubtask}
          />
        ))}
      </ul>
      <button
        onClick={handleAddSubtask}
        type='button'
        className='text-Main-Purple dark:bg-white mt-1 text-Body-L font-bold bg-Main-Purple bg-opacity-10 h-10 w-full rounded-full'
      >
        + Add New Subtask
      </button>
    </div>
  )
}
