'use client'
import { fakeBoardData } from '@/fake/boardData'
import ColumList, {
  ColumnListProps
} from '@/presentation/components/ColumnList/ColumnList'
import { useParams, redirect } from 'next/navigation'

export default function BoardPage () {
  const { board } = useParams()
  const boardInfo = fakeBoardData.find(b => b.id === 'board-1')
  if (!boardInfo) {
    redirect('/')
  }

  const boardData: ColumnListProps['board'] = {
    id: boardInfo.id,
    name: boardInfo.name,
    columns: boardInfo.columns.map(col => ({
      id: col.id,
      title: col.name,
      tasks: col.tasks.map(t => ({
        id: t.id,
        name: t.title,
        completedSubTasksAmount: t.subtasks.filter(s => s.completed).length,
        totalSubTasksAmount: t.subtasks.length
      }))
    }))
  }

  return (
    <main className='flex'>
      <ColumList board={boardData} />
    </main>
  )
}
