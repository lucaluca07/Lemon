import * as React from 'react';
import MenuItem from './MenuItem';

export interface MenuProps {
  icon?: React.ReactNode;
  children: React.ReactNode[];
  draggable?: boolean;
  style?: React.CSSProperties;
}

export default class Menu extends React.Component<MenuProps, {}> {
  public static Item = MenuItem;

  private renderComponent = () => {
    const { children, draggable } = this.props;
    return React.Children.map(children, child => (
      <div draggable={draggable} className="menu-item-wrapper">
        {child}
      </div>
    ));
  }

  public render() {
    const { style } = this.props;
    return <div className="menu" style={style}>{this.renderComponent()}</div>;
  }
}
