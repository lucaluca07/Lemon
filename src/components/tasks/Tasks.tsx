import React from 'react';
import Task from '../task';
import classNames from 'classnames';

interface IProps {
  tasks: { id: string; title: string; completed: boolean }[];
}
const Tasks: React.FC<IProps> = ({ tasks }) => {
  return (
    <ul className={classNames('task-list')}>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default Tasks;
