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
  tasks: [1, 2, 3, 4, 5, 6].map((item) => ({
    id: String(item),
    title: '测试 task' + item,
    completed: false,
  })),
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
      const { id, ...rest } = action.payload;
      let index = state.tasks.findIndex((task) => task.id === id);
      if (index > -1) {
        let task = state.tasks[index];
        state.tasks[index] = { ...task, ...rest };
      }
    },
    deleteTask(state, action) {
      const tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = tasks;
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
