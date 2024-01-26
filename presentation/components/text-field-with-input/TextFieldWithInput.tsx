import { Label } from '../label/Label'
import { TextField } from '../text-field/TextField'

export const TextFieldWithInput = ({
  label,
  name,
  placeholder,
  required = false,
  value,
  onValueChange,
}: {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  value?: string
  onValueChange: (value: string) => void
}) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <Label name={name}>{label}</Label>
      <TextField
        onValueChange={onValueChange}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}
