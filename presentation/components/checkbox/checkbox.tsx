import { CheckIcon } from '@/presentation/@shared/assets'
import { useRef } from 'react'

export function CheckBox ({
  checked = false,
  name,
  onChange
}: {
  checked?: boolean
  name: string
  onChange: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!inputRef.current) return
    inputRef.current.click()
  }
  return (
    <div className='relative h-4 w-4'>
      <input
        onChange={onChange}
        ref={inputRef}
        id={name}
        type='checkbox'
        checked={checked}
        className={`h-4 w-4 appearance-none bg-white border-[1px] border-Medium-Grey border-opacity-25 rounded-sm outline-none checked:bg-Main-Purple`}
      />
      {checked && (
        <CheckIcon
          onClick={handleClick}
          className='absolute text-[12px] top-[3px] left-[2px]'
        />
      )}
    </div>
  )
}
