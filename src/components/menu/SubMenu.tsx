import React from 'react';
import classNames from 'classnames';

const SubMenu: React.FC = ({ children }) => {
  return <div className={classNames('sub-menu')}>{children}</div>;
};

export default SubMenu;
