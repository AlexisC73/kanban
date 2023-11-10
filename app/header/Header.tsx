import { MenuCtx } from '@/context/menu/MenuCtx'
import { AppLogo, ArrowDownIcon } from '@/presentation/@shared/assets'
import { useContext } from 'react'

export const Header = () => {
  return (
    <div className='bg-white dark:bg-Dark-Grey h-16 flex items-center md:border-b-[1px] border-Lines-Light dark:border-b-Lines-Dark'>
      <div className='flex items-center gap-x-4 md:gap-x-6'>
        <Branding />
        <BoardTitle boardTitle='Platform Launch' />
      </div>
    </div>
  )
}

export const Branding = () => {
  const { isOpen: isMenuOpen } = useContext(MenuCtx)
  return (
    <div
      className={`pl-4 flex items-center text-Heading-XL gap-x-4 md:w-[200px] md:border-r-[1px] md:border-r-Lines-Light md:dark:border-r-Lines-Dark h-16 ${
        isMenuOpen
          ? 'md:w-[260px] lg:w-[300px] md:border-b-Lines-Light md:dark:border-b-Lines-Dark md:border-b-[1px]'
          : null
      }`}
    >
      <AppLogo />
      <p className='hidden md:block text-[30px] dark:text-white'>kanban</p>
    </div>
  )
}

export const BoardTitle = ({ boardTitle }: { boardTitle: string }) => {
  const { isOpen: isMenuOpen, toggleMenu } = useContext(MenuCtx)
  return (
    <div className='text-Heading-L dark:text-white'>
      <div onClick={toggleMenu} className='md:hidden flex items-center gap-x-2'>
        <h1>{boardTitle}</h1>
        <ArrowDownIcon
          className={`text-Main-Purple text-[11px] ${
            isMenuOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <p className='hidden md:block'>{boardTitle}</p>
    </div>
  )
}
