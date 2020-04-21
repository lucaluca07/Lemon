import * as React from 'react';
import Tooltip from 'src/components/tooltip';

const Main: React.FC = () => {
  return (
    <div className="main">
      Main
      <Tooltip>
        <div
          className="tooltip-test"
          onClick={() => {
            console.log(1111);
          }}
        >
          Tooltip Click
        </div>
      </Tooltip>
    </div>
  );
};

export default Main;
