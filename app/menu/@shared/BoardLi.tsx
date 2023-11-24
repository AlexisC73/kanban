import { BoardLogo } from '@/presentation/@shared/assets'
import Link from 'next/link'

export const BoardLi = ({
  label,
  boardId,
  active = false,
}: {
  label: string
  boardId: string
  active?: boolean
}) => {
  const activeStyle = ' bg-Main-Purple text-white rounded-r-full'
  return (
    <li
      className={`flex text-Medium-Grey pl-6 h-12 ${
        active ? activeStyle : null
      }`}
    >
      <Link className="flex items-center gap-x-3" href={boardId}>
        <BoardLogo />
        <p className="text-Heading-M">{label}</p>
      </Link>
    </li>
  )
}
