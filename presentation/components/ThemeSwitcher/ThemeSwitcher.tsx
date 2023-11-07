import { ThemeCtx } from '@/context/theme/ThemeCtx'
import { DarkModeIcon, LightModeIcon } from '@/presentation/@shared/assets'
import { useContext } from 'react'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeCtx)
  const customClass = `w-10 h-5 bg-Main-Purple rounded-[10px] relative flex items-center px-[3px] cursor-pointer ${
    theme === 'dark' ? 'justify-end' : 'justify-start'
  }`

  return (
    <div className='flex justify-center text-Medium-Grey gap-x-[24px] items-center h-12 w-full dark:bg-Very-Dark-Grey bg-Light-Grey'>
      <LightModeIcon className='text-[18px]' />
      <div className={customClass} onClick={toggleTheme}>
        <div className='h-[14px] w-[14px] bg-white rounded-full'></div>
      </div>
      <DarkModeIcon />
    </div>
  )
}
