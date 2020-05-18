import { createSlice } from '@reduxjs/toolkit';
import { RawDraftContentState } from 'draft-js';

interface BaseTask {
  id: string;
  title: string;
  projectId: string;
  completed: boolean;
  deleted: boolean;
  date?: number;
  tags?: string[];
  content?: RawDraftContentState;
}

export interface TaskState {
  tasks: BaseTask[];
}

const initialState: TaskState = {
  tasks: [1, 2, 3, 4, 5, 6].map((item) => ({
    id: String(item),
    title: '测试 task' + item,
    completed: false,
    projectId: 'inbox',
    deleted: false,
  })),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const { title, projectId = 'inbox' } = action.payload;
      state.tasks.push({
        id: String(Date.now()),
        title,
        projectId,
        completed: false,
        deleted: false,
      });
    },
    updateTask(state, action) {
      const { id, ...rest } = action.payload;
      let index = state.tasks.findIndex((task) => task.id === id);
      if (index > -1) {
        let task = state.tasks[index];
        state.tasks[index] = { ...task, ...rest };
      }
    },
    deleteTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.deleted = true;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
