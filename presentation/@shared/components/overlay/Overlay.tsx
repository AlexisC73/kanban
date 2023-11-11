import { PropsWithChildren } from 'react'

export const Overlay = ({
  children,
  fixed = false
}: { fixed?: boolean } & PropsWithChildren) => {
  return (
    <div
      className={`${
        fixed ? 'fixed' : 'absolute'
      } inset-0 h-screen bg-Black bg-opacity-40 flex items-center justify-center`}
    >
      {children}
    </div>
  )
}
