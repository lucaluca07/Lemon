import React, { useContext, memo } from 'react';
import classNames from 'classnames';
import menuContext from './store';

interface IProps {
  prefix?: React.ReactNode;
  after?: React.ReactNode;
  eventKey: string;
}

const MenuItem: React.FC<IProps> = ({ prefix, after, children, eventKey }) => {
  const { state } = useContext(menuContext);
  return (
    <div
      className={classNames('menu-item', {
        'menu-item-active': state?.selectedKeys.includes(eventKey),
      })}
    >
      {prefix}
      {children}
      {after}
    </div>
  );
};

export default MenuItem;
