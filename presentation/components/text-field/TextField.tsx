import { FocusEvent, useState } from 'react'

export function TextField({
  name,
  placeholder,
  value,
  onValueChange,
  required,
  id,
}: {
  name: string
  placeholder?: string
  value?: string
  required?: boolean
  onValueChange: (value: string) => void
  id?: string
}) {
  const [hasError, setHasError] = useState(false)

  const customClass = hasError
    ? 'border-Red'
    : 'border-Medium-Grey border-opacity-25'

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value.length <= 0) {
      if (required) {
        setHasError(true)
        return
      }
    }
    setHasError(false)
  }
  return (
    <div
      className={`flex items-center justify-between w-full dark:text-white px-4 pt-[9px] text-Body-L pb-[8px] border-[1px] rounded-[0.25rem] bg-white dark:bg-Dark-Grey outline-none ${customClass}`}
    >
      <input
        placeholder={placeholder ?? 'Enter task name'}
        id={id}
        name={name}
        onBlur={handleBlur}
        className={`outline-none bg-transparent placeholder:opacity-25 flex-1 text-Black dark:text-white dark:placeholder:opacity-25`}
        value={value}
        required={required}
        onChange={(e) => {
          onValueChange(e.target.value)
        }}
      />
      {hasError && <p className='text-Body-L text-Red'>Can’t be empty</p>}
    </div>
  )
}
