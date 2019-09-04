import * as React from 'react';
import TabBar from './TabBar';
import TabContent from './TabContent';
import TabPane from './TabPane';
import { isFunction } from '../../utils/typeof';
import './tabs.less';

export interface TabsProps {
  children: React.ReactNode[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key:  string) => void;
  renderTabBar?: () => React.ReactElement<any>;
  renderTabContent?: () => React.ReactElement<any>;
}

export interface TabsState {
  activeKey: string;
}

const getDefaultActiveKey: (props: TabsProps) => string = props => {
  let activeKey = '';
  React.Children.forEach(props.children, (child: any) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
};

const activeKeyIsValid: (props: TabsProps, key: string) => boolean = (
  props,
  key,
) => {
  const keys = React.Children.map(
    props.children,
    (child: any) => child && child.key,
  );
  return keys.indexOf(key) >= 0;
};

export default class Tabs extends React.Component<TabsProps, TabsState> {
  tabBar: any;

  static TabPane = TabPane;

  constructor(props: TabsProps) {
    super(props);

    let activeKey: string;

    if ('activeKey' in props) {
      activeKey = props.activeKey || '';
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey || '';
    } else {
      activeKey = getDefaultActiveKey(props);
    }

    this.state = {
      activeKey,
    };
  }

  static getDerivedStateFromProps(props: TabsProps, state: TabsState) {
    const newState: {
      activeKey?: string;
    } = {};
    if ('activeKey' in props) {
      newState.activeKey = props.activeKey;
    } else if (!activeKeyIsValid(props, state.activeKey)) {
      newState.activeKey = getDefaultActiveKey(props);
    }
    if (Object.keys(newState).length > 0) {
      return newState;
    }
    return null;
  }

  onTabClick: (activeKey: string, e: React.MouseEvent<any>) => void = (activeKey, e) => {
    if (this.tabBar && this.tabBar.props.onTabClick) {
      this.tabBar.props.onTabClick(activeKey, e);
    }
    this.setActiveKey(activeKey);
  }

  setActiveKey: (key: string) => void = (activeKey) => {
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        });
      }
      const { onChange } = this.props;
      if(onChange && isFunction(onChange)){
        onChange(activeKey);
      }
    }
  }

  renderContent = () => {
    const { renderTabBar, renderTabContent, children } = this.props;
    const { activeKey } = this.state;

    const tabBarProps = {
      key: 'tabBar',
      onTabClick: this.onTabClick,
      panels: children,
      activeKey,
    };

    const tabContentProps = {
      key: 'tabContent',
      activeKey,
      children,
      onChange: this.setActiveKey,
    };
    this.tabBar = renderTabBar && isFunction(renderTabBar) && renderTabBar();
    const tabBar = this.tabBar
       ? (
        React.cloneElement(this.tabBar, {
          ...tabBarProps,
        })
      ) : (
        <TabBar key="tabBar" {...tabBarProps} />
      );

    const tabContent =
      renderTabContent && isFunction(renderTabContent) ? (
        React.cloneElement(renderTabContent(), {
          ...tabContentProps,
        })
      ) : (
        <TabContent key="tabContent" {...tabContentProps} />
      );

    return [tabBar, tabContent];
  };

  public render() {
    return <div className="tabs">{this.renderContent()}</div>;
  }
}
