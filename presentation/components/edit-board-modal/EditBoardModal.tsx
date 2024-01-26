import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { TextFieldWithInput } from '../text-field-with-input/TextFieldWithInput'
import { TextField } from '../text-field/TextField'
import { CrossIcon, SpinnerIcon } from '@/presentation/@shared/assets'
import { useState } from 'react'
import { useAppDispatch } from '@/lib/hook'
import { editBoard } from '@/lib/boards/usecases/edit-board.usecase'

export const EditBoardModal = ({
  boardToEdit,
  closeModal,
}: {
  boardToEdit: {
    id: string
    name: string
    columns: Array<{ id: string; name: string }>
  }
  closeModal: () => void
}) => {
  const dispatch = useAppDispatch()
  const [submiting, setSubmiting] = useState(false)
  const [board, setBoard] = useState({
    id: boardToEdit.id,
    name: boardToEdit.name,
    columns: boardToEdit.columns,
  })

  const deleteColumn = (id: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.filter((column) => column.id !== id),
    }))
  }

  const editColumnName = (id: string) => (name: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === id ? { ...column, name } : column,
      ),
    }))
  }

  const addNewColumn = () => {
    setBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, { id: `column_${Date.now()}`, name: '' }],
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmiting(true)
    console.log(board)
    dispatch(
      editBoard({
        id: board.id,
        name: board.name,
        columns: board.columns,
      }),
    )
      .then(() => {
        setSubmiting(false)
        closeModal?.()
      })
      .catch((e) => {
        console.log(e.message)
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
        onClick={(e) => {
          e.stopPropagation()
        }}
        className='bg-white dark:bg-Dark-Grey flex flex-col gap-y-6 p-8 w-full md:w-[480px] rounded-md mx-4 md:mx-0'
      >
        <h2 className='text-Heading-L dark:text-white'>Edit board</h2>
        <TextFieldWithInput
          label='Board Name'
          name='board-name'
          required
          value={board.name}
          onValueChange={(value: string) => {
            setBoard((prev) => ({ ...prev, name: value }))
          }}
          placeholder='e.g. Web Design'
        />

        <ListWithCrossButton
          columns={board.columns}
          onColumnNameChange={editColumnName}
          deleteColumn={deleteColumn}
          onAddNewColumn={addNewColumn}
        />
        <button
          type='submit'
          disabled={submiting}
          className='text-white hover:bg-Main-Purple-Hover disabled:bg-opacity-60 bg-Main-Purple flex items-center justify-center text-Body-L font-bold h-10 w-full rounded-full'
        >
          {submiting ? <SpinnerIcon className='text-[22px]' /> : 'Save Changes'}
        </button>
      </form>
    </Overlay>
  )
}

export const ListWithCrossButton = ({
  columns,
  onColumnNameChange,
  deleteColumn,
  onAddNewColumn,
}: {
  columns: Array<{ id: string; name: string }>
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
        {columns.map((column) => (
          <InputWithCrossButton
            onColumnNameChange={onColumnNameChange}
            required
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
  deleteColumn,
  required = false,
}: {
  column: { id: string; name: string }
  onColumnNameChange: (id: string) => (name: string) => void
  deleteColumn: (id: string) => void
  required?: boolean
}) => {
  return (
    <li className='flex items-center gap-x-4'>
      <TextField
        onValueChange={onColumnNameChange(column.id)}
        required={required}
        id={column.id}
        name={`${column.id}`}
        value={column.name}
        placeholder='e.g. Todo'
      />
      <CrossIcon
        onClick={() => {
          deleteColumn(column.id)
        }}
        className='text-Medium-Grey text-[18px] cursor-pointer'
      />
    </li>
  )
}
