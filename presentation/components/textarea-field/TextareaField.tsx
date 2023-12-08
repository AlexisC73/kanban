import { ChangeEvent } from 'react'
import { Label } from '../label/Label'

export function TextareaField({
  label,
  name,
  rows = 4,
  placeholder,
  hasError = false,
  value,
  handleValueChange,
}: {
  label: string
  name: string
  rows?: number
  placeholder?: string
  hasError?: boolean
  value: string
  handleValueChange: (value: string) => void
}) {
  const customClass = hasError
    ? 'border-Red'
    : 'border-Medium-Grey border-opacity-25'

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleValueChange(event.target.value)
  }
  return (
    <div className='flex flex-col gap-y-2'>
      <Label name={name}>{label}</Label>
      <div
        className={`flex items-center justify-between dark:text-white px-4 pt-[9px] text-Body-L pb-[8px] border-[1px] rounded-[0.25rem] bg-white dark:bg-Dark-Grey outline-none ${customClass}`}
      >
        <textarea
          placeholder={placeholder ?? 'Enter task name'}
          id={name}
          name={name}
          className={`outline-none bg-transparent placeholder:opacity-25 flex-1 text-Black dark:text-white dark:placeholder:opacity-25`}
          rows={rows}
          value={value}
          onChange={onTextChange}
        />
        {hasError && <p className='text-Body-L text-Red'>Can’t be empty</p>}
      </div>
    </div>
  )
}
