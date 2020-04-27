import { createSlice } from '@reduxjs/toolkit';

interface BaseTask {
  id: string;
  title: string;
  date?: number;
  completed: boolean;
}

export interface TaskState {
  tasks: BaseTask[];
}

const initialState: TaskState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const { title } = action.payload;
      state.tasks = [
        ...state.tasks,
        { id: String(Date.now()), title, completed: false },
      ];
    },
    updateTask(state, action) {
      const { id, title, completed } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.completed = completed;
      }
      state.tasks = [...state.tasks];
    },
    deleteTask(state, action) {
      const tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = tasks;
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
