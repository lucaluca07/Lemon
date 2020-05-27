import React from 'react';
import Tag from '../tag';

const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Tags: React.FC = () => {
  return (
    <>
      {tags.map((item) => (
        <Tag tag={`tag${item}`} key={item} />
      ))}{' '}
      <Tag tag="+" />
    </>
  );
};

export default Tags;
