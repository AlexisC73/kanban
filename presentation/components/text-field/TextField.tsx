export function TextField ({ hasError = true }: { hasError?: boolean }) {
  const customClass = hasError
    ? 'border-Red'
    : 'border-Medium-Grey border-opacity-25'
  return (
    <div
      className={`flex items-center justify-between text-Black px-4 pt-[9px] text-Body-L pb-[8px] border-[1px] rounded-[0.25rem] bg-white outline-none placeholder:opacity-25 ${customClass}`}
    >
      <input
        placeholder='Enter task name'
        className={`outline-none placeholder:opacity-25`}
      />
      {hasError && <p className='text-Body-L text-Red'>Can’t be empty</p>}
    </div>
  )
}
