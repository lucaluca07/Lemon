import React from 'react';
import ColorPicker from 'src/components/color-picker';

const ModalContent: React.FC = () => {
  return (
    <>
      <label>
        <span>项目名称</span>
        <input type="text" />
      </label>
      <label>
        <span>项目颜色</span>
        <ColorPicker />
      </label>
    </>
  );
};

export default ModalContent;
