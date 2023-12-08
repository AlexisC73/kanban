'use client'

import { TaskViewProvider } from '@/context/task-view/TaskViewCtx'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TaskViewProvider>{children}</TaskViewProvider>
}
