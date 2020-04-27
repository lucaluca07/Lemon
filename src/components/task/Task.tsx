import React from 'react';

interface IProps {
  id: string;
  title: string;
}

const Task: React.FC<IProps> = ({ id, title }) => {
  return (
    <li>
      <span>{title}</span>
    </li>
  );
};

export default Task;
