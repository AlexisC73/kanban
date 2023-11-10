'use client'

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

  const [currentState, setCurrentState] = useState('Todo')
  return <main className='bg-Light-Grey'></main>
}
