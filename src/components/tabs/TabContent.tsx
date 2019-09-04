import * as React from 'react';
import { tabPaneProps } from './TabPane';
import './tabContent.less';

export interface TabBarProps {
  activeKey: string;
}

const TabBar: React.SFC<TabBarProps> = ({ activeKey, children }) => {
  const [position, setPosition] = React.useState(0);

  const tabContents = React.useMemo(() => {
    return React.Children.map(
      children,
      (child: { props: tabPaneProps; key: string }) => ({
        content: child.props.children,
        key: child.key,
        placeholder: child.props.placeholder,
        forceRender: child.props.forceRender,
      }),
    );
  }, [children]);

  React.useEffect(() => {
    const keys = tabContents.map(el => el.key);
    const index = keys.indexOf(activeKey);
    if (index > -1) {
      setPosition(index);
    }
  }, [activeKey]);

  return (
    <div className="tab-content">
      <ul style={{ left: `${-(position * 100)}%` }}>
        {tabContents &&
          tabContents.map(el => (
            <li key={el.key}>
              {activeKey === el.key || el.forceRender ? el.content : el.placeholder}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TabBar;
