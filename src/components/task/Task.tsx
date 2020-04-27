import React from 'react';
import classNames from 'classnames';
import Checkbox from 'src/components/checkbox';

interface IProps {
  id: string;
  title: string;
  completed: boolean;
}

const Task: React.FC<IProps> = ({ id, title, completed }) => {
  return (
    <li className={classNames('task', { 'task-completed': completed })}>
      <div className="task-drag">
        <i className="iconfont icon-drag" />
      </div>
      <div className="task-details">
        <Checkbox />
        <span className="task-title">{title}</span>
      </div>
    </li>
  );
};

export default Task;
