import { ThemeSwitcher } from '@/presentation/components/ThemeSwitcher/ThemeSwitcher'
import { BoardsList } from '../@shared/BoardsList'
import { HideMenuIcon, ShowMenuIcon } from '@/presentation/@shared/assets'
import { useContext } from 'react'
import { MenuCtx } from '@/context/menu/MenuCtx'

export const SideMenu = () => {
  const { setIsOpen, isOpen: isMenuOpen } = useContext(MenuCtx)
  return (
    <>
      <div
        className={`h-full w-[260px] bg-white dark:bg-Dark-Grey pt-[30px] pb-[47px] border-r-[1px] border-Lines-Light dark:border-Lines-Dark flex-col justify-between ${
          isMenuOpen ? 'hidden md:flex' : 'hidden'
        }`}
      >
        <BoardsList />
        <div className='flex flex-col px-3 gap-y-[30px]'>
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(false)}
            className='flex items-center text-Medium-Grey gap-x-[10px] px-3'
          >
            <HideMenuIcon />
            <span className='text-Heading-M'>Hide Sidebar</span>
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className={`text-white bottom-8 bg-Main-Purple h-12 w-14 items-center justify-center rounded-r-full ${
          isMenuOpen ? 'hidden' : 'hidden md:flex md:absolute'
        }`}
      >
        <ShowMenuIcon />
      </button>
    </>
  )
}
