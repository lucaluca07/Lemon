import React from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  top: number;
  left: number;
  height: number;
  visible: boolean;
}

const Popup: React.FC<IProps> = ({ top, left, height, visible }) => {
  console.log(top, left, height, visible, 1111);
  return createPortal(
    <div
      style={{
        top: top + height,
        left,
        display: visible ? 'block' : 'none',
        position: 'absolute',
      }}
    >
      Popup
    </div>,
    document.body,
  );
};

export default Popup;
