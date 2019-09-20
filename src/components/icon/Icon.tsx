import * as React from 'react';
import classnames from 'classnames';

export interface IconProps {
  type: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const Icon: React.SFC<IconProps> = ({ type, onClick, className }) => {
  const classString = classnames('iconfont', className, {
    [`icon-${type}`]: !!type,
  });

  return <i className={classString} onClick={onClick} />;
};
export default Icon;
