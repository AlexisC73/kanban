'use client'
import { selectBoard } from '@/lib/boards/slices/boards.slice'
import { selectBoardColumns } from '@/lib/boards/slices/columns.slice'
import { useAppSelector } from '@/lib/hook'
import { AddBoardModal } from '@/presentation/components/add-board-modal/AddBoardModal'
import { AddTaskModal } from '@/presentation/components/add-task-modal/AddTaskModal'
import { EditBoardModal } from '@/presentation/components/edit-board-modal/EditBoardModal'
import { useParams } from 'next/navigation'
import { ReactNode, createContext, useState } from 'react'

export const BoardActionsCtx = createContext<{
  showAddBoardModal: boolean
  setShowAddBoardModal: (isOpen: boolean) => void
  showEditBoardModal: boolean
  setShowEditBoardModal: (isOpen: boolean) => void
  showAddTaskModal: boolean
  setShowAddTaskModal: (isOpen: boolean) => void
}>({
  showAddBoardModal: false,
  setShowAddBoardModal: (isOpen) => {},
  showEditBoardModal: false,
  setShowEditBoardModal: () => {},
  showAddTaskModal: false,
  setShowAddTaskModal: () => {},
})

export const BoardActionsCtxProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false)
  const [showEditBoardModal, setShowEditBoardModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const { board: boardId } = useParams<{ board: string }>()
  const board = useAppSelector((state) => selectBoard(state, boardId))
  const columns = useAppSelector((state) => selectBoardColumns(state, boardId))

  return (
    <BoardActionsCtx.Provider
      value={{
        showAddBoardModal,
        setShowAddBoardModal,
        showEditBoardModal,
        setShowEditBoardModal,
        showAddTaskModal,
        setShowAddTaskModal,
      }}
    >
      {showAddBoardModal && (
        <AddBoardModal
          closeModal={() => {
            setShowAddBoardModal(false)
          }}
        />
      )}
      {showEditBoardModal && !!board && (
        <EditBoardModal
          boardToEdit={{
            columns,
            id: board.id,
            name: board.name,
          }}
          closeModal={() => {
            setShowEditBoardModal(false)
          }}
        />
      )}
      {showAddTaskModal && (
        <AddTaskModal
          boardId={boardId}
          closeModal={() => {
            setShowAddTaskModal(false)
          }}
        />
      )}
      {children}
    </BoardActionsCtx.Provider>
  )
}
