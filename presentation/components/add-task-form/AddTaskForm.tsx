import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { TextFieldWithInput } from '../text-field-with-input/TextFieldWithInput'
import { TextareaField } from '../textarea-field/TextareaField'
import { SubtasksEditList } from '../subtask-edit-list/SubtaskEditList'
import { StatusSelect } from '../status-select/StatusSelect'

export const AddTaskForm = () => {
  return (
    <Overlay>
      <div className='bg-white dark:bg-Dark-Grey p-6 flex flex-col gap-y-6 w-full mx-4 rounded-md md:w-[480px]'>
        <h2 className='text-Heading-L dark:text-white'>Add New Task</h2>
        <form className='flex flex-col gap-y-6'>
          <TextFieldWithInput
            name='title'
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
          />

          <SubtasksEditList />

          <div className='flex flex-col gap-y-2'>
            <span className='text-Body-M text-Medium-Grey dark:text-white'>
              Status
            </span>
            <StatusSelect
              defaultValue='Todo'
              onChange={() => console.log('test')}
            />
          </div>
          <button
            type='submit'
            className='text-white text-Body-L font-bold bg-Main-Purple h-10 w-full rounded-full'
          >
            Create Task
          </button>
        </form>
      </div>
    </Overlay>
  )
}
