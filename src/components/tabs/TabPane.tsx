import * as React from 'react';

export interface tabPaneProps{
  tab: string | React.ReactNode;
  key: string;
  forceRender?: boolean;
  placeholder?: React.ReactNode;
  children?: React.ReactNode;
};

 const TabPane: React.SFC<tabPaneProps> = () => null;

export default TabPane;