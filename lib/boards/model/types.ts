import { Board } from './board.entity'
import { Column } from './column.entity'

export type BoardWithColumns = Omit<Board, 'columns'> & { columns: Column[] }
