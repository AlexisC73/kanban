import { CrossIcon } from '@/presentation/@shared/assets'
import { TextField } from '../../text-field/TextField'

export const SubtaskEditItem = ({
  id,
  name,
  onNameChange,
  deleteSubtask,
}: {
  name: string
  id: string
  onNameChange: (id: string, name: string) => void
  deleteSubtask: (id: string) => void
}) => {
  const handleNameChange = (newName: string) => {
    onNameChange(id, newName)
  }
  return (
    <li className='flex flex-1 items-center gap-x-4'>
      <TextField
        required
        onValueChange={handleNameChange}
        name='task-1'
        value={name}
      />
      <CrossIcon
        className='text-[15px] text-Medium-Grey cursor-pointer'
        onClick={() => {
          deleteSubtask(id)
        }}
      />
    </li>
  )
}
