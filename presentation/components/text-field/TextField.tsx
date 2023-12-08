export function TextField({
  name,
  placeholder,
  hasError = false,
  value,
  onValueChange,
  id,
}: {
  name: string
  placeholder?: string
  hasError?: boolean
  value?: string
  onValueChange: (value: string) => void
  id?: string
}) {
  const customClass = hasError
    ? 'border-Red'
    : 'border-Medium-Grey border-opacity-25'
  return (
    <div
      className={`flex items-center justify-between w-full dark:text-white px-4 pt-[9px] text-Body-L pb-[8px] border-[1px] rounded-[0.25rem] bg-white dark:bg-Dark-Grey outline-none ${customClass}`}
    >
      <input
        placeholder={placeholder ?? 'Enter task name'}
        id={id}
        name={name}
        className={`outline-none bg-transparent placeholder:opacity-25 flex-1 text-Black dark:text-white dark:placeholder:opacity-25`}
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value)
        }}
      />
      {hasError && <p className='text-Body-L text-Red'>Can’t be empty</p>}
    </div>
  )
}
