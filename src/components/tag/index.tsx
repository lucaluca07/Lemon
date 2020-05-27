import React from 'react';
import './style.less';

interface IProps {
  tag: React.ReactNode;
}

const Tag: React.FC<IProps> = ({ tag }) => {
  return <div className="tag">{tag}</div>;
};

export default Tag;
