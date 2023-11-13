import { CrossIcon } from '@/presentation/@shared/assets'
import { TextField } from '../../text-field/TextField'

export const SubtaskEditItem = () => {
  return (
    <li className='flex flex-1 items-center gap-x-4'>
      <TextField name='task-1' />
      <CrossIcon className='text-[15px] text-Medium-Grey cursor-pointer' />
    </li>
  )
}
