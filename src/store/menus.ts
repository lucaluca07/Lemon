import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BASE {
  id: string;
  name: string;
  hide?: boolean;
}

interface Menu extends BASE {
  icon: string;
}

export interface MenuState {
  bases: Menu[];
  projects: BASE[];
}

const today = new Date().getDate();

const initialState: MenuState = {
  bases: [
    {
      id: 'inbox',
      name: '收件箱',
      icon: 'inbox',
    },
    {
      id: 'today',
      name: '今天',
      icon: `calendar-${today}`,
    },
    {
      id: 'week',
      name: '最近 7 天',
      icon: 'calendar-w',
    },
    {
      id: 'calendar',
      name: '日历',
      icon: 'calendar',
    },
  ],
  projects: [
    {
      id: 'inbox',
      name: '收件箱',
      hide: true,
    },
    {
      id: 'test',
      name: '测试项目',
    },
  ],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action) {
      const { id, name } = action.payload;
      state.projects = [
        ...state.projects,
        { id: id || String(Date.now()), name },
      ];
    },
    updateProject(state, action) {
      const { id, name } = action.payload;
      const project = state.projects.find((project) => project.id === id);
      if (project) {
        project.name = name;
      }
      state.projects = [...state.projects];
    },
    deleteProject(state, action) {
      const projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
      state.projects = projects;
    },
  },
});

export const {
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
