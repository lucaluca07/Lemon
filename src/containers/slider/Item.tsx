import * as React from 'react';
import Icon from '../../components/icon';

export interface ItemProps {
  icon: string;
  name: string;
}

const Item: React.SFC<ItemProps> = ({ icon, name }) => {
  return (
    <div className="slider-item">
      <span className="slider-icon-wrapper">
        <Icon type={icon} />
      </span>
      <span>{name}</span>
    </div>
  );
};

export default Item;
