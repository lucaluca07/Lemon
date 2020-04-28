import React from 'react';

interface IProps {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Checkbox: React.FC<IProps> = ({ onChange, checked }) => {
  return (
    <label className="checkbox">
      <input
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        type="checkbox"
      />
      <span className="checkbox-inner" />
    </label>
  );
};

export default Checkbox;
