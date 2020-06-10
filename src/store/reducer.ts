import { combineReducers } from 'redux';
import menus from './menus';
import tasks from './tasks';
import tags from './tags';

const rootReducer = combineReducers({
  menus,
  tasks,
  tags,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
