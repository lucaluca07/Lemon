import React from 'react';
import ColorPicker from 'src/components/color-picker';

const ModalContent: React.FC = () => {
  return (
    <>
      <div className="form-field">
        <label className="form-field-label">项目名称</label>
        <input type="text" />
      </div>
      <div className="form_field">
        <label className="form-field-label">项目颜色</label>
        <ColorPicker />
      </div>
    </>
  );
};

export default ModalContent;
