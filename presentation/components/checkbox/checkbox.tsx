import { CheckIcon } from '@/presentation/@shared/assets'

export function CheckBox ({
  checked = false,
  name,
  onChange
}: {
  checked?: boolean
  name: string
  onChange: () => void
}) {
  return (
    <div className='relative h-4 w-4'>
      <input
        onChange={onChange}
        id={name}
        type='checkbox'
        checked={checked}
        className={`h-4 w-4 appearance-none bg-white border-[1px] border-Medium-Grey border-opacity-25 rounded-sm outline-none checked:bg-Main-Purple`}
      ></input>
      {checked && (
        <CheckIcon className='absolute text-[12px] top-[3px] left-[2px]' />
      )}
    </div>
  )
}
