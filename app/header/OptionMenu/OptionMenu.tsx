import { BoardActionsCtx } from '@/context/boardActions/BoardActions'
import { VerticalMenuIcon } from '@/presentation/@shared/assets'
import { useContext, useState } from 'react'

export default function OptionMenu() {
  const [showMenuList, setShowMenuList] = useState(false)

  return (
    <div className='flex items-center justify-center relative'>
      <VerticalMenuIcon
        onClick={() => {
          setShowMenuList(true)
        }}
        className='text-Medium-Grey cursor-pointer'
      />
      {showMenuList && (
        <OptionMenuList
          closeMenuList={() => {
            setShowMenuList(false)
          }}
        />
      )}
    </div>
  )
}

const OptionMenuList = ({ closeMenuList }: { closeMenuList: () => void }) => {
  const { setShowEditBoardModal } = useContext(BoardActionsCtx)

  const handleEditBoard = () => {
    closeMenuList()
    setShowEditBoardModal(true)
  }

  return (
    <ul className='absolute top-10 right-0 bg-white dark:bg-Dark-Grey p-4 flex flex-col gap-y-4 w-[192px] rounded-lg'>
      <li onClick={handleEditBoard} className='text-Medium-Grey cursor-pointer'>
        Edit Board
      </li>
      <li className='text-Red cursor-pointer'>Delete Board</li>
    </ul>
  )
}
