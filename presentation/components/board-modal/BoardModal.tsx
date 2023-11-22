import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { TextFieldWithInput } from '../text-field-with-input/TextFieldWithInput'
import { TextField } from '../text-field/TextField'
import { CrossIcon, SpinnerIcon } from '@/presentation/@shared/assets'
import { useState } from 'react'

export const BoardModal = ({
  defaultBoard = {
    id: Date.now().toString(),
    name: '',
    columns: []
  },
  isEdit,
  onSubmit,
  closeModal
}: {
  defaultBoard?: {
    id: string
    name: string
    columns: { id: string; name: string }[]
  }
  isEdit?: boolean
  onSubmit?: (board: {
    id: string
    name: string
    column: { id: string; name: string }[]
  }) => Promise<void>
  closeModal: () => void
}) => {
  const [submiting, setSubmiting] = useState(false)
  const [editBoard, setEditBoard] = useState({
    id: defaultBoard.id,
    boardName: defaultBoard.name,
    boardColumns: defaultBoard.columns
  })

  const deleteColumn = (id: string) => {
    setEditBoard(prev => ({
      ...prev,
      boardColumns: prev.boardColumns.filter(column => column.id !== id)
    }))
  }

  const editColumnName = (id: string) => (name: string) => {
    setEditBoard(prev => ({
      ...prev,
      boardColumns: prev.boardColumns.map(column =>
        column.id === id ? { ...column, name } : column
      )
    }))
  }

  const addNewColumn = () => {
    setEditBoard(prev => ({
      ...prev,
      boardColumns: [
        ...prev.boardColumns,
        { id: `column_${Date.now()}`, name: '' }
      ]
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmiting(true)
    onSubmit?.({
      id: editBoard.id,
      name: editBoard.boardName,
      column: editBoard.boardColumns
    }).then(() => {
      setSubmiting(false)
      closeModal?.()
    })
  }

  const handleCloseModal = () => {
    if (submiting) {
      return
    }
    closeModal?.()
  }

  return (
    <Overlay onClickAction={handleCloseModal}>
      <form
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
        className='bg-white dark:bg-Dark-Grey flex flex-col gap-y-6 p-8 w-full md:w-[480px] rounded-md mx-4 md:mx-0'
      >
        <h2 className='text-Heading-L dark:text-white'>
          {isEdit ? 'Edit board' : 'Add New Board'}
        </h2>
        <TextFieldWithInput
          label='Board Name'
          name='board-name'
          value={editBoard.boardName}
          onValueChange={(value: string) =>
            setEditBoard(prev => ({ ...prev, boardName: value }))
          }
          placeholder='e.g. Web Design'
        />

        <ListWithCrossButton
          columns={editBoard.boardColumns}
          onColumnNameChange={editColumnName}
          deleteColumn={deleteColumn}
          onAddNewColumn={addNewColumn}
        />
        <button
          type='submit'
          disabled={submiting}
          className='text-white hover:bg-Main-Purple-Hover disabled:bg-opacity-60 bg-Main-Purple flex items-center justify-center text-Body-L font-bold h-10 w-full rounded-full'
        >
          {submiting ? (
            <SpinnerIcon className='text-[22px]' />
          ) : isEdit ? (
            'Save Changes'
          ) : (
            'Create New Board'
          )}
        </button>
      </form>
    </Overlay>
  )
}

export const ListWithCrossButton = ({
  columns,
  onColumnNameChange,
  deleteColumn,
  onAddNewColumn
}: {
  columns: { id: string; name: string }[]
  onColumnNameChange: (id: string) => (name: string) => void
  deleteColumn: (id: string) => void
  onAddNewColumn: () => void
}) => {
  return (
    <div>
      <p className='text-Medium-Grey dark:text-white text-Body-M pb-2'>
        Board Columns
      </p>
      <ul className='flex flex-col gap-y-3'>
        {columns.map(column => (
          <InputWithCrossButton
            onColumnNameChange={onColumnNameChange}
            column={column}
            key={column.id}
            deleteColumn={deleteColumn}
          />
        ))}
      </ul>
      <button
        onClick={onAddNewColumn}
        type='button'
        className='text-Main-Purple dark:text-Main-Purple dark:bg-white dark:bg-opacity-100 bg-Main-Purple bg-opacity-10 rounded-full h-10 w-full text-Body-L font-bold mt-3'
      >
        + Add New Column
      </button>
    </div>
  )
}

export const InputWithCrossButton = ({
  column,
  onColumnNameChange,
  deleteColumn
}: {
  column: { id: string; name: string }
  onColumnNameChange: (id: string) => (name: string) => void
  deleteColumn: (id: string) => void
}) => {
  return (
    <li className='flex items-center gap-x-4'>
      <TextField
        onValueChange={onColumnNameChange(column.id)}
        id={column.id}
        name={`${column.id}`}
        value={column.name}
        placeholder='e.g. Todo'
      />
      <CrossIcon
        onClick={() => deleteColumn(column.id)}
        className='text-Medium-Grey text-[18px] cursor-pointer'
      />
    </li>
  )
}
