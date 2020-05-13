import React from 'react';
import Task from '../task';
import classNames from 'classnames';

interface IProps {
  tasks: { id: string; title: string; completed: boolean }[];
  updateTaskStatus: (id: string, completed: boolean) => void;
  onClick: (id: string) => void;
}
const Tasks: React.FC<IProps> = ({ tasks, updateTaskStatus, onClick }) => {
  return (
    <ul className={classNames('task-list')}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          onClick={onClick}
          updateTaskStatus={updateTaskStatus}
          {...task}
        />
      ))}
    </ul>
  );
};

export default Tasks;
