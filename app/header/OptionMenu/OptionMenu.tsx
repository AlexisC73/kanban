import { BoardActionsCtx } from '@/context/boardActions/BoardActions'
import { deleteBoard } from '@/lib/boards/usecases/deleteBoard.usecase'
import { useAppDispatch } from '@/lib/hook'
import { VerticalMenuIcon } from '@/presentation/@shared/assets'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

export default function OptionMenu() {
  const [showMenuList, setShowMenuList] = useState(false)

  const toggleMenuList = () => {
    setShowMenuList((prev) => !prev)
  }

  return (
    <div className='flex items-center justify-center relative'>
      <VerticalMenuIcon
        onClick={toggleMenuList}
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
  const { board }: { board: string } = useParams()
  const dispatch = useAppDispatch()

  const handleEditBoard = () => {
    closeMenuList()
    setShowEditBoardModal(true)
  }

  const handleDeleteBoard = () => {
    try {
      dispatch(deleteBoard(board)).finally(() => {
        closeMenuList()
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleMouseLeave = () => {
    closeMenuList()
  }

  return (
    <ul
      onMouseLeave={handleMouseLeave}
      className='absolute top-10 right-0 bg-white dark:bg-Dark-Grey p-4 flex flex-col gap-y-4 w-[192px] rounded-lg'
    >
      <li onClick={handleEditBoard} className='text-Medium-Grey cursor-pointer'>
        Edit Board
      </li>
      <li className='text-Red cursor-pointer' onClick={handleDeleteBoard}>
        Delete Board
      </li>
    </ul>
  )
}
