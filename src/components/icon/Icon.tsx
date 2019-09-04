import * as React from 'react';
import classnames from 'classnames';

export interface IconProps {
  type: string;
}

const Icon: React.SFC<IconProps> = ({ type }) => {
  const classString = classnames('iconfont', {
    [`icon-${type}`]: !!type,
  });

  return <i className={classString} />;
};
export default Icon;
