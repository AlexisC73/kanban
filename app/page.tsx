'use client'

import { Column } from '@/presentation/components/column/Column'

export default function Home () {
  return (
    <main className='flex gap-x-6 p-4 py-6 md:px-6'>
      <Column title='TODO' />
      <Column title='DOING' />
      <Column title='DONE' />
    </main>
  )
}
