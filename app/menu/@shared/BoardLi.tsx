import { BoardLogo } from '@/presentation/@shared/assets'

export const BoardLi = ({
  label,
  active = false
}: {
  label: string
  active?: boolean
}) => {
  const activeStyle = ' bg-Main-Purple text-white rounded-r-full'
  return (
    <li
      className={`flex items-center gap-x-3 text-Medium-Grey pl-6 h-12 ${
        active ? activeStyle : null
      }`}
    >
      <BoardLogo />
      <p className='text-Heading-M'>{label}</p>
    </li>
  )
}
