import { PropsWithChildren } from 'react'

export const Overlay = ({
  children,
  fixed = false,
  onClickAction,
}: { fixed?: boolean; onClickAction?: () => void } & PropsWithChildren) => {
  return (
    <div
      onClick={onClickAction}
      className={`${
        fixed ? 'fixed' : 'absolute'
      } inset-0 h-screen bg-Black bg-opacity-40 flex items-center z-50 justify-center`}
    >
      {children}
    </div>
  )
}
