import { TextField } from '../text-field/TextField'

export const TextFieldWithInput = ({
  label,
  name,
  placeholder,
  hasError = false
}: {
  label: string
  name: string
  placeholder?: string
  hasError?: boolean
}) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <label
        className='text-Body-M dark:text-white text-Medium-Grey'
        htmlFor={name}
      >
        {label}
      </label>
      <TextField name={name} placeholder={placeholder} />
    </div>
  )
}
