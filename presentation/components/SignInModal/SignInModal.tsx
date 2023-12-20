import { Overlay } from '@/presentation/@shared/components/overlay/Overlay'
import { SignInForm } from './SignInForm/SignInForm'

export const SignInModal = ({
  overlayClickAction,
}: {
  overlayClickAction?: () => void
}) => {
  return (
    <Overlay onClickAction={overlayClickAction}>
      <SignInForm />
    </Overlay>
  )
}
