import classnames from 'classnames';
import * as React from 'react';
import './tabBar.less';
import { TabPaneProps } from './TabPane';

export interface TabBarProps {
  activeKey: string;
  panels: React.ReactNode;
  onTabClick?: (key: string, e: React.MouseEvent) => void;
}

const TabBar: React.SFC<TabBarProps> = ({ activeKey, panels, onTabClick }) => {
  const [width, setWidth] = React.useState(0);
  const [position, setPosition] = React.useState(0);

  const tabBars = React.useMemo(() => {
    return React.Children.map(
      panels,
      (child: { props: TabPaneProps; key: string }) => ({
        tab: child.props.tab,
        key: child.key
      })
    );
  }, [panels]);

  React.useEffect(() => {
    const node: HTMLElement | null = document.querySelector('.tab-bar-active');
    if (node) {
      const width = node.offsetWidth;
      const position = node.offsetLeft;
      setWidth(width);
      setPosition(position);
    }

  }, [activeKey]);

  return (
    <div className="tab-bar">
      <ul className="tab-bar-list">
        {tabBars && tabBars.map(el => (
          <li
            className={classnames('tab-bar-item', {
              'tab-bar-active': el.key === activeKey
            })}
            onClick={e => {
              if (onTabClick) onTabClick(el.key, e);
            }}
            key={el.key}
          >
            {el.tab}
          </li>
        ))}
      </ul>
      <div style={{ width, left: position }} className="tab-bar-inner" />
    </div>
  );
};

export default TabBar;
