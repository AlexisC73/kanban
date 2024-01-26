import { ChangeEvent, FocusEvent, useState } from 'react'
import { Label } from '../label/Label'

export function TextareaField({
  label,
  name,
  rows = 4,
  placeholder,
  required = false,
  value,
  handleValueChange,
}: {
  label: string
  name: string
  rows?: number
  placeholder?: string
  value: string
  required?: boolean
  handleValueChange: (value: string) => void
}) {
  const [hasError, setHasError] = useState(false)

  const customClass = hasError
    ? 'border-Red'
    : 'border-Medium-Grey border-opacity-25'

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (e.target.value.length <= 0) {
      if (required) {
        setHasError(true)
        return
      }
    }
    setHasError(false)
  }

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
          onBlur={handleBlur}
          className={`outline-none bg-transparent placeholder:opacity-25 flex-1 text-Black dark:text-white dark:placeholder:opacity-25`}
          rows={rows}
          required={required}
          value={value}
          onChange={onTextChange}
        />
        {hasError && <p className='text-Body-L text-Red'>Can’t be empty</p>}
      </div>
    </div>
  )
}
