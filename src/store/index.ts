import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const initStore = () => {
  const store = configureStore({ reducer });
  return store;
};

export default initStore;
