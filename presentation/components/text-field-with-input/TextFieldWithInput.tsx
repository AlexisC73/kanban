import { Label } from '../label/Label'
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
      <Label name={name}>{label}</Label>
      <TextField name={name} placeholder={placeholder} />
    </div>
  )
}
