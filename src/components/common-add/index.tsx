import * as React from 'react';
import classNames from 'classnames';
import './style.less';

interface IProps {
  name: string;
  onClick: () => void;
  className?: string;
}

const CommonAdd: React.FC<IProps> = ({ name, onClick, className }) => {
  return (
    <div className={classNames('common-add', className)} onClick={onClick}>
      <i className="iconfont icon-icon_add_round add-icon" />
      <i className="iconfont icon-icon_add_fill add-icon" />
      <span>{name}</span>
    </div>
  );
};

export default CommonAdd;
