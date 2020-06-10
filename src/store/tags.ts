import { createSlice } from '@reduxjs/toolkit';
import { RawDraftContentState } from 'draft-js';

interface BaseTag {
  id: string;
  tag: string;
  color?: string;
  deleted?: boolean;
}

const initialState: BaseTag[] = [];

const tasksSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag(state, action) {
      const { id = String(Date.now()), tag, color } = action.payload;
      state.push({
        id,
        tag,
        color,
      });
    },
    updateTag(state, action) {
      const { id, ...rest } = action.payload;
      let index = state.findIndex((tag) => tag.id === id);
      if (index > -1) {
        let tag = state[index];
        state[index] = { ...tag, ...rest };
      }
    },
    deleteTag(state, action) {
      const tag = state.find((tag) => tag.id === action.payload);
      if (tag) {
        tag.deleted = true;
      }
    },
  },
});

export const { addTag, updateTag, deleteTag } = tasksSlice.actions;

export default tasksSlice.reducer;
