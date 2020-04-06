import * as React from 'react';
import Main from '../main';
import Detail from '../detail';

const Tasks: React.FC = () => {
  return (
    <div className="tasks">
      <Main />
      <Detail />
    </div>
  );
};

export default Tasks;
