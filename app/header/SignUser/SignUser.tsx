import { selectAuthUser } from '@/lib/auth/slices/auth.slice'
import { useAppSelector } from '@/lib/hook'
import { SignInModal } from '@/presentation/components/SignInModal'
import { ReactNode, useState } from 'react'

export const SignUser = () => {
  const user = useAppSelector(selectAuthUser)
  const [signinModal, setShowSigninModal] = useState(false)

  const AuthNode: ReactNode = (() => {
    switch (user) {
      case undefined:
        return (
          <>
            <SignInButton
              onClickAction={() => {
                setShowSigninModal(true)
              }}
            />
            {signinModal && (
              <SignInModal
                overlayClickAction={() => {
                  setShowSigninModal(false)
                }}
              />
            )}
          </>
        )
      default:
        return <div>{user.id}</div>
    }
  })()
  return <div>{AuthNode}</div>
}

const SignInButton = ({ onClickAction }: { onClickAction: () => void }) => {
  return (
    <button
      onClick={onClickAction}
      className='border-[2px] border-Main-Purple px-5 h-12 rounded-full text-Heading-M text-Main-Purple'
    >
      M&apos;inscrire | Me connecter
    </button>
  )
}
