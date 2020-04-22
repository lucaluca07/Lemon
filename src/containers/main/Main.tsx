import React, { useRef } from 'react';
import Tooltip from 'src/components/tooltip';
import Button from 'src/components/button';

const Main: React.FC = () => {
  const testNode = useRef(null);
  return (
    <div className="main">
      Main
      <Tooltip>
        <Button>Tooltip Click</Button>
      </Tooltip>
    </div>
  );
};

export default Main;
