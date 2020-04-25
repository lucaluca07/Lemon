import React from 'react';

const colors = [
  'rgb(184, 37, 95)',
  'rgb(219, 64, 53)',
  'rgb(255, 153, 51)',
  'rgb(250, 208, 0)',
  'rgb(175, 184, 59)',
  'rgb(126, 204, 73)',
  'rgb(41, 148, 56)',
  'rgb(106, 204, 188)',
  'rgb(21, 143, 173)',
  'rgb(20, 170, 245)',
  'rgb(150, 195, 235)',
  'rgb(64, 115, 255)',
  'rgb(136, 77, 255)',
  'rgb(175, 56, 235)',
  'rgb(235, 150, 235)',
  'rgb(224, 81, 148)',
  'rgb(255, 141, 133)',
  'rgb(128, 128, 128)',
  'rgb(184, 184, 184)',
  'rgb(204, 172, 147)',
];

const ColorPicker: React.FC = () => {
  return (
    <div className="color-picker">
      <ul className="color-picker-base">
        {colors.map((color) => (
          <li
            className="color-picker-item"
            key={color}
            style={{ backgroundColor: color }}
          />
        ))}
      </ul>
    </div>
  );
};

export default ColorPicker;
