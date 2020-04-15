import React from 'react';
import classNames from 'classnames';

interface SubMenuProps {
  title: React.ReactNode;
  eventKey: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ title, children }) => {
  return (
    <div className={classNames('menu-submenu')}>
      <div className={classNames('menu-submenu-title')}>
        <i className="menu-submenu-arrow" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
};

export default SubMenu;
