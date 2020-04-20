import React from 'react';

const colors = ['#fff1f0', '#ffccc7', '#ffa39e', '#ff7875', '#f5222d', ''];

const ModalContent: React.FC = () => {
  return (
    <>
      <label>
        <span>项目名称</span>
        <input type="text" />
      </label>
      <label>
        <span>项目颜色</span>
        <input type="radio" />
        <input type="radio" />
        <input type="radio" />
        <input type="radio" />
      </label>
    </>
  );
};

export default ModalContent;
