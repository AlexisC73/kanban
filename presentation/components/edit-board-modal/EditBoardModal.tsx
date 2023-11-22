import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { TextFieldWithInput } from '../text-field-with-input/TextFieldWithInput'
import { TextField } from '../text-field/TextField'
import { CrossIcon } from '@/presentation/@shared/assets'
import { useState } from 'react'

export const EditBoardModal = () => {
  const [editBoard, setEditBoard] = useState({
    boardName: 'Platform Launch',
    boardColumns: [
      { id: '1', name: 'Todo' },
      { id: '2', name: 'Doing' },
      { id: '3', name: 'Done' }
    ]
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

  return (
    <Overlay fixed>
      <div className='bg-white flex flex-col gap-y-6 p-8 w-full md:w-[480px] rounded-md mx-4 md:mx-0'>
        <h2 className='text-Heading-L'>Edit Board</h2>
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
        <button className='text-white bg-Main-Purple text-Body-L font-bold h-10 w-full rounded-full'>
          Save Changes
        </button>
      </div>
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
      <p className='text-Medium-Grey text-Body-M pb-2'>Board Columns</p>
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
        className='text-Main-Purple bg-Main-Purple bg-opacity-10 rounded-full h-10 w-full text-Body-L font-bold mt-3'
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
        name={`column_${column.id}`}
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
