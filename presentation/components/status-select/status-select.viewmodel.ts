import { selectBoardColumns } from '@/lib/boards/slices/columns.slice'
import { RootState } from '@/lib/store'

export enum StatusModelType {
  NO_COLUMN = 'NO_COLUMN',
  WITH_COLUMNS = 'WITH_COLUMNS',
}

export const selectStatusViewModelForBoard = (
  state: RootState,
  { boardId }: { boardId: string },
):
  | {
      type: StatusModelType.NO_COLUMN
    }
  | {
      type: StatusModelType.WITH_COLUMNS
      data: Array<{
        id: string
        name: string
        boardId: string
      }>
    } => {
  const columns = selectBoardColumns(state, boardId)

  if (!columns || columns.length === 0) {
    return {
      type: StatusModelType.NO_COLUMN,
    }
  }

  return {
    type: StatusModelType.WITH_COLUMNS,
    data: columns,
  }
}
