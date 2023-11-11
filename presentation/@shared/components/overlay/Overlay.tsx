import { PropsWithChildren } from 'react'

export const Overlay = ({ children }: PropsWithChildren) => {
  return (
    <div className='fixed inset-0 bg-Black bg-opacity-40 flex items-center justify-center'>
      {children}
    </div>
  )
}
