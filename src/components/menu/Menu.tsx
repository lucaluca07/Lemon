import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';
import MenuContext, { reducer, initialState } from './store';

interface IProps {
  selectedKeys?: string[];
}

const Menu: React.FC<IProps> = ({ children, selectedKeys }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: 'UPDATE_SELECTED_KEYS', payload: selectedKeys });
  }, [selectedKeys]);
  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      <div className={classNames('menu')}>{children}</div>
    </MenuContext.Provider>
  );
};

export default Menu;
