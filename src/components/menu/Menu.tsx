import React, { useEffect, useReducer } from 'react';
import classNames from 'classnames';
import MenuContext, { reducer } from './store';

interface IProps {
  selectedKeys?: string[];
  openKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}

const Menu: React.FC<IProps> = ({
  children,
  selectedKeys,
  openKeys,
  defaultSelectedKeys = [],
  defaultOpenKeys = [],
}) => {
  const [state, dispatch] = useReducer(reducer, {
    openKeys: defaultOpenKeys,
    selectedKeys: defaultSelectedKeys,
  });

  useEffect(() => {
    dispatch({ type: 'UPDATE_SELECTED_KEYS', payload: selectedKeys });
  }, [selectedKeys]);

  useEffect(() => {
    dispatch({ type: 'UPDATE_OPEN_KEYS', payload: openKeys });
  }, [openKeys]);

  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      <ul className={classNames('menu')}>{children}</ul>
    </MenuContext.Provider>
  );
};

export default Menu;
