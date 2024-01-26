import { signinWithGithub } from '@/lib/auth/usecases/signin-with-github.usecase'
import { useAppDispatch } from '@/lib/hook'
import { GithubIcon } from '@/presentation/@shared/assets'

export const SignInForm = () => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
      className='bg-white p-6 w-[450px] rounded-lg'
    >
      <div className='flex justify-center items-center w-full mb-8'>
        <div className='bg-Dark-Grey h-px w-full'></div>
        <p className='text-Heading-L flex-1 min-w-[150px] text-center'>
          Me connecter
        </p>
        <div className='bg-Dark-Grey h-px w-full'></div>
      </div>
      <div id='social-login' className='flex flex-col gap-y-4 py-2'>
        <SignInWithGithubButton />
      </div>
    </div>
  )
}

export const SignInWithGithubButton = () => {
  const dispatch = useAppDispatch()
  const handleSignInWithGithub = () => {
    dispatch(signinWithGithub())
  }

  return (
    <button
      type='button'
      onClick={handleSignInWithGithub}
      className='py-2 px-4 max-w-md flex gap-x-2 justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
    >
      <GithubIcon className='text-[22px]' />
      Sign in Fake
    </button>
  )
}
