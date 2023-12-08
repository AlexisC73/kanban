import { Column, ColumnProps } from '../column/Column'

export interface ColumnListProps {
  board: {
    id: string
    name: string
    columns: Array<{ id: string } & ColumnProps>
  }
}

export default function ColumList({ board }: ColumnListProps) {
  return (
    <div className='flex gap-x-6 p-4 py-6 md:px-6'>
      {board.columns.map((col) => (
        <Column key={col.id} title={col.title} tasks={col.tasks} />
      ))}
    </div>
  )
}
