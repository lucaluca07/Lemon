import React, { useContext, memo } from 'react';
import classNames from 'classnames';
import menuContext from './store';

interface IProps {
  prefix?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: (eventKey: string) => void;
  eventKey: string;
}

const MenuItem: React.FC<IProps> = ({
  onClick,
  prefix,
  after,
  children,
  eventKey,
}) => {
  const { state } = useContext(menuContext);
  return (
    <li
      onClick={() => onClick?.(eventKey)}
      className={classNames('menu-item', {
        'menu-item-active': state?.selectedKeys.includes(eventKey),
      })}
    >
      {prefix}
      {children}
      {after}
    </li>
  );
};

export default MenuItem;
