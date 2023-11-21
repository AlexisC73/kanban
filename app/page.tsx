'use client'

import { fakeBoardData } from '@/fake/boardData'
import { redirect } from 'next/navigation'

export default function Home () {
  const boardsName = fakeBoardData.map(b => ({ id: b.id, name: b.name }))
  if (boardsName.length > 0) {
    redirect(`/board/${boardsName[0].id}`)
  }
  return <main className='flex gap-x-6 p-4 py-6 md:px-6'></main>
}
