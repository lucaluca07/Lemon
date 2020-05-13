import React from 'react';
import classNames from 'classnames';
import Checkbox from 'src/components/checkbox';

interface IProps {
  id: string;
  title: string;
  completed: boolean;
  updateTaskStatus: (id: string, completed: boolean) => void;
  onClick: (id: string) => void;
}

const Task: React.FC<IProps> = ({
  id,
  title,
  completed,
  updateTaskStatus,
  onClick,
}) => {
  return (
    <li
      onClick={() => onClick(id)}
      className={classNames('task', { 'task-completed': completed })}
    >
      <div className="task-drag">
        <i className="iconfont icon-drag" />
      </div>
      <div className="task-details">
        <Checkbox
          checked={completed}
          onChange={(completed) => {
            updateTaskStatus?.(id, completed);
          }}
        />
        <span className="task-title">{title}</span>
      </div>
    </li>
  );
};

export default Task;
