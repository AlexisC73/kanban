'use client'
import { selectBoard } from '@/lib/boards/slices/boards.slice'
import { selectColumnsFromBoard } from '@/lib/boards/slices/column.slice'
import { useAppSelector } from '@/lib/hook'
import { AddBoardModal } from '@/presentation/components/add-board-modal/AddBoardModal'
import { EditBoardModal } from '@/presentation/components/edit-board-modal/EditBoardModal'
import { useParams } from 'next/navigation'
import { ReactNode, createContext, useState } from 'react'

export const BoardActionsCtx = createContext<{
  showAddBoardModal: boolean
  setShowAddBoardModal: (isOpen: boolean) => void
  showEditBoardModal: boolean
  setShowEditBoardModal: (isOpen: boolean) => void
}>({
  showAddBoardModal: false,
  setShowAddBoardModal: (isOpen) => {},
  showEditBoardModal: false,
  setShowEditBoardModal: () => {},
})

export const BoardActionsCtxProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false)
  const [showEditBoardModal, setShowEditBoardModal] = useState(false)
  const { board: boardId } = useParams<{ board: string }>()
  const board = useAppSelector((state) => selectBoard(state, boardId))
  const boardColumns = useAppSelector((state) =>
    selectColumnsFromBoard(state, boardId),
  )

  return (
    <BoardActionsCtx.Provider
      value={{
        showAddBoardModal,
        setShowAddBoardModal,
        showEditBoardModal,
        setShowEditBoardModal,
      }}
    >
      {showAddBoardModal && (
        <AddBoardModal
          closeModal={() => {
            setShowAddBoardModal(false)
          }}
        />
      )}
      {showEditBoardModal && (
        <EditBoardModal
          boardToEdit={{
            columns: boardColumns ?? [],
            id: boardId ?? '',
            name: board?.name ?? '',
          }}
          closeModal={() => {
            setShowEditBoardModal(false)
          }}
        />
      )}
      {children}
    </BoardActionsCtx.Provider>
  )
}
