import { combineReducers } from 'redux';
import menus from './menus';
import tasks from './tasks';

const rootReducer = combineReducers({
  menus,
  tasks,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
