'use client'

import { MenuCtx } from '@/context/menu/MenuCtx'
import { AppLogo } from '@/presentation/@shared/assets'
import { AddTaskButton } from '@/presentation/components/add-task-button/AddTaskButton'
import { useContext } from 'react'
import OptionMenu from './OptionMenu/OptionMenu'
import { BoardActionsCtx } from '@/context/boardActions/BoardActions'
import { SignUser } from './SignUser'
import { BoardTitle } from './BoardTitle'

export const Header = ({ columnLength }: { columnLength: number }) => {
  const { setShowAddTaskModal } = useContext(BoardActionsCtx)
  return (
    <div className='fixed top-0 left-0 right-0 bg-white dark:bg-Dark-Grey h-16 flex items-center md:border-b-[1px] border-Lines-Light dark:border-b-Lines-Dark'>
      <div className='flex w-full justify-between'>
        <div className='flex items-center gap-x-4 md:gap-x-6'>
          <Branding />
          <BoardTitle />
        </div>
        <div className='flex items-center gap-x-4 pr-4'>
          <AddTaskButton
            onClick={() => {
              setShowAddTaskModal(true)
            }}
            disabled={columnLength <= 0}
          />
          <SignUser />
          <OptionMenu />
        </div>
      </div>
    </div>
  )
}

export const Branding = () => {
  const { isOpen: isMenuOpen } = useContext(MenuCtx)
  return (
    <div
      className={`pl-4 flex items-center text-Heading-XL gap-x-4 md:w-[200px] md:border-r-[1px] md:border-r-Lines-Light md:dark:border-r-Lines-Dark h-16 ${
        isMenuOpen
          ? 'md:w-[260px] lg:w-[300px] md:border-b-Lines-Light md:dark:border-b-Lines-Dark md:border-b-[1px]'
          : null
      }`}
    >
      <AppLogo />
      <p className='hidden md:block text-[30px] dark:text-white'>kanban</p>
    </div>
  )
}
