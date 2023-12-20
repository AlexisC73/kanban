'use client'

import { selectAuthUser } from '@/lib/auth/slices/auth.slice'
import { useAppSelector } from '@/lib/hook'
import { SignInModal } from '@/presentation/components/SignInModal'
import { redirect } from 'next/navigation'

export default function Login() {
  const authUser = useAppSelector(selectAuthUser)
  if (authUser !== undefined) {
    redirect('/')
  }
  return (
    <div>
      <SignInModal />
    </div>
  )
}
