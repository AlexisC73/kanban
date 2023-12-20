'use client'

import { WithMenuLayout } from '@/app/layout/withMenu/withMenuLayout'
import { BoardActionsCtxProvider } from '@/context/boardActions/BoardActions'
import { MenuCtxProvider } from '@/context/menu/MenuCtx'
import { TaskViewProvider } from '@/context/task-view/TaskViewCtx'
import { selectAuthUser } from '@/lib/auth/slices/auth.slice'
import { useAppSelector } from '@/lib/hook'
import { redirect } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authUser = useAppSelector(selectAuthUser)
  if (!authUser) {
    redirect('/auth/login')
  }

  return (
    <BoardActionsCtxProvider>
      <MenuCtxProvider>
        <WithMenuLayout>
          <TaskViewProvider>{children}</TaskViewProvider>
        </WithMenuLayout>
      </MenuCtxProvider>
    </BoardActionsCtxProvider>
  )
}
