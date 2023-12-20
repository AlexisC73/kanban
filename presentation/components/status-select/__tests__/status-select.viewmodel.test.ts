import { stateBuilder } from '@/lib/state.builder'
import { createTestStore } from '@/lib/store'
import {
  StatusModelType,
  selectStatusViewModelForBoard,
} from '../status-select.viewmodel'

describe('Status select view model', () => {
  it('Example: there is no statuses in the store for the selected board', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'Board 1',
            owner: 'alice-id',
            columns: [],
          },
        ])
        .withAuthUser({
          user: { id: 'alice-id' },
          token: JSON.stringify({ id: 'alice-id' }),
        })
        .build(),
    )

    const statusSelectViewModel = selectStatusViewModelForBoard(
      store.getState(),
      { boardId: 'board-id' },
    )

    expect(statusSelectViewModel).toEqual({
      type: StatusModelType.NO_COLUMN,
    })
  })

  it('Example: there is multiples statuses in the store for the selected board', () => {
    const store = createTestStore(
      {},
      stateBuilder()
        .withBoards([
          {
            id: 'board-id',
            name: 'Board 1',
            owner: 'alice-id',
            columns: ['col-1', 'col-2'],
          },
        ])
        .withColumns([
          {
            id: 'col-1',
            name: 'Col 1',
            boardId: 'board-id',
          },
          {
            id: 'col-2',
            name: 'Col 2',
            boardId: 'board-id',
          },
        ])
        .build(),
    )

    const statusSelectViewModel = selectStatusViewModelForBoard(
      store.getState(),
      { boardId: 'board-id' },
    )

    expect(statusSelectViewModel).toEqual({
      type: StatusModelType.WITH_COLUMNS,
      data: [
        {
          id: 'col-1',
          name: 'Col 1',
          boardId: 'board-id',
        },
        {
          id: 'col-2',
          name: 'Col 2',
          boardId: 'board-id',
        },
      ],
    })
  })
})
