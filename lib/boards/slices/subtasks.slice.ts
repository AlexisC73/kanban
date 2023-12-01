import { createSlice } from '@reduxjs/toolkit'
import { subtaskEntityAdapter } from '../model/subtask.entity'
import { getBoards } from '../usecases/get-boards.usecase'
import { RootState } from '@/lib/store'

export const subtasksSlice = createSlice({
  name: 'subtasks',
  initialState: subtaskEntityAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      subtaskEntityAdapter.addMany(
        state,
        action.payload.flatMap((b) =>
          b.columns.flatMap((c) =>
            c.tasks.flatMap((t) =>
              t.subtasks.map((s) => ({
                id: s.id,
                name: s.name,
                completed: s.completed,
              })),
            ),
          ),
        ),
      )
    })
  },
})

export const selectSubtasks = (state: RootState, subtaskIds: string[]) =>
  subtaskEntityAdapter
    .getSelectors()
    .selectAll(state.subtasks)
    .filter((s) => subtaskIds.includes(s.id))
