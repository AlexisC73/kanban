'use client'

import { SubtaskCheckbox } from '@/presentation/components/subtask-checkbox/SubtaskCheckbox'
import { useState } from 'react'

export default function Home () {
  const [state, setState] = useState([
    {
      id: '1',
      completed: false,
      label: 'Idle'
    },
    {
      id: '2',
      completed: false,
      label: 'Hovered'
    },
    {
      id: '3',
      completed: true,
      label: 'Completed'
    }
  ])

  const toggleCompleted = (id: string) => {
    setState(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  return (
    <main className='min-h-screen min-w-full flex items-center flex-col justify-center bg-Black'>
      <div className='flex flex-col gap-y-4 w-[350px]'>
        {state.map(item => (
          <SubtaskCheckbox
            key={item.id}
            completed={item.completed}
            id={item.id}
            label={item.label}
            onChange={() => toggleCompleted(item.id)}
          />
        ))}
      </div>
    </main>
  )
}
