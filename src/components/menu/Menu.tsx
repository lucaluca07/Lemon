import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';
import MenuContext, { reducer, initialState } from './store';

interface IProps {
  selectedKeys?: string[];
  openKeys?: string[];
}

const Menu: React.FC<IProps> = ({ children, selectedKeys, openKeys }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: 'UPDATE_SELECTED_KEYS', payload: selectedKeys });
  }, [selectedKeys]);
  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      <ul className={classNames('menu')}>{children}</ul>
    </MenuContext.Provider>
  );
};

export default Menu;
