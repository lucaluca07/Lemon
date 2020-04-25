import React from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  top: number;
  left: number;
  height: number;
  visible: boolean;
  title: React.ReactNode;
}

const Popup: React.FC<IProps> = ({ top, left, height, visible, title }) => {
  console.log(top, left, height, visible, 1111);
  return createPortal(
    <div
      style={{
        top: top + height,
        left,
        display: visible ? 'block' : 'none',
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      {title}
    </div>,
    document.body,
  );
};

export default Popup;
