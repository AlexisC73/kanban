import { BoardLogo } from '@/presentation/@shared/assets'
import { BoardLi } from './BoardLi'

export const BoardsList = () => {
  return (
    <div>
      <h2 className='text-Heading-S uppercase text-Medium-Grey px-6 pb-4'>
        All Boards (3)
      </h2>
      <div>
        <ul className='pr-6'>
          <BoardLi label='Platform Launch' active />
          <BoardLi label='Marketing Plan' />
          <BoardLi label='Roadmap' />
        </ul>
        <button className='flex items-center gap-x-3 pl-6 h-12 text-Main-Purple'>
          <BoardLogo />
          <span className='text-Heading-M'>+ Create New Board</span>
        </button>
      </div>
    </div>
  )
}
