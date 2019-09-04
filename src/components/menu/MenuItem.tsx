import * as React from 'react';
import './item.less';

export interface MenuProps {
  icon?: React.ReactNode;
}

export default class MenuItem extends React.Component<MenuProps, {}> {
  private renderIcon = () => {
    const { icon } = this.props;
    return <span className="menu-item-icon">{icon}</span>;
  }

  private renderComponent = () => {
    const { icon, children } = this.props;
    return (
      <span className="menu-item-inner">
        {icon && this.renderIcon()}
        {children}
      </span>
    );
  }

  public render() {
    return <div className="menu-item">{this.renderComponent()}</div>;
  }
}
