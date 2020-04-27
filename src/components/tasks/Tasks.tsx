import React from 'react';
import Task from '../task';

interface IProps {
  tasks: { id: string; title: string }[];
}
const Tasks: React.FC<IProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default Tasks;
