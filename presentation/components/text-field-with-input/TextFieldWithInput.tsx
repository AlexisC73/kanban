import { Label } from '../label/Label'
import { TextField } from '../text-field/TextField'

export const TextFieldWithInput = ({
  label,
  name,
  placeholder,
  hasError = false,
  value,
  onValueChange
}: {
  label: string
  name: string
  placeholder?: string
  hasError?: boolean
  value?: string
  onValueChange: (value: string) => void
}) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <Label name={name}>{label}</Label>
      <TextField onValueChange={onValueChange} name={name} value={value} placeholder={placeholder} />
    </div>
  )
}
