'use client'

import { ThemeSwitcher } from '@/presentation/components/ThemeSwitcher/ThemeSwitcher'
import { DropdownSelect } from '@/presentation/components/dopdown-select/dropdownSelect'
import { SubtaskCheckbox } from '@/presentation/components/subtask-checkbox/SubtaskCheckbox'
import { TextField } from '@/presentation/components/text-field/TextField'
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
  return (
    <main className='min-h-screen min-w-full flex items-center flex-col justify-center bg-white dark:bg-Dark-Grey'>
      <div className='absolute top-0 left-0 w-[240px]'>
        <ThemeSwitcher />
      </div>

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
        <TextField />
        <TextField hasError={false} />
        <DropdownSelect
          onChange={setCurrentState}
          defaultValue={currentState}
        />
        <DropdownSelect
          onChange={setCurrentState}
          defaultValue={currentState}
        />
      </div>
    </main>
  )
}
