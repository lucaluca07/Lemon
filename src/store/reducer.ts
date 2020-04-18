import { combineReducers } from 'redux';
import menus from './menus';

const rootReducer = combineReducers({
  menus,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
