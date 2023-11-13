export const Label = ({
  name,
  children
}: {
  name: string
  children: string
}) => {
  return (
    <label
      className='text-Body-M dark:text-white text-Medium-Grey'
      htmlFor={name}
    >
      {children}
    </label>
  )
}
