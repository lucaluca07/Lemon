import React, { useRef } from 'react';
import Tooltip from 'src/components/tooltip';
import Button from 'src/components/button';
import CommonAdd from 'src/components/common-add';

const Main: React.FC = () => {
  return (
    <div className="main">
      <header>
        <h1>test</h1>
      </header>
      <CommonAdd
        name="添加任务"
        className="add-task"
        onClick={() => {
          console.log(111111);
        }}
      />
    </div>
  );
};

export default Main;
