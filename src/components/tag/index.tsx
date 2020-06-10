import React from 'react';
import { colorPalette } from 'src/utils/colors';
import './style.less';

export interface ITag {
  tag: React.ReactNode;
  color?: string;
  onClose?: () => void;
}

const Tag: React.FC<ITag> = ({ tag, color, onClose }) => {
  const backgroundColor = color && colorPalette(color, 1);
  return (
    <div
      style={{ color: color, backgroundColor, borderColor: color }}
      className="tag"
    >
      <div onClick={onClose} className="tag-close" />
      {tag}
    </div>
  );
};

export default Tag;
