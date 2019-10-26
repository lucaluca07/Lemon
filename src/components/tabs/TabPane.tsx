import * as React from 'react';

export interface TabPaneProps{
  tab: string | React.ReactNode;
  key: string;
  forceRender?: boolean;
  placeholder?: React.ReactNode;
  children?: React.ReactNode;
}

 const TabPane: React.SFC<TabPaneProps> = () => null;

export default TabPane;
