'use client'

import { selectAuthUser } from '@/lib/auth/slices/auth.slice'
import { useAppSelector } from '@/lib/hook'
import { redirect } from 'next/navigation'

export default function Home() {
  const authUser = useAppSelector(selectAuthUser)

  if (authUser === undefined) {
    redirect('/auth/login')
  }

  redirect('/board')
}
