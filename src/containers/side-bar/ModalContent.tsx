import React from 'react';
import ColorPicker from 'src/components/color-picker';

interface IProps {
  onChange: (type: 'name' | 'color', value: string) => void;
}
const ModalContent: React.FC<IProps> = ({ onChange }) => {
  return (
    <>
      <div className="form-field">
        <label className="form-field-label">项目名称</label>
        <input
          type="text"
          onChange={(e) => {
            onChange('name', e.target.value);
          }}
        />
      </div>
      <div className="form_field">
        <label className="form-field-label">项目颜色</label>
        <ColorPicker />
      </div>
    </>
  );
};

export default ModalContent;
