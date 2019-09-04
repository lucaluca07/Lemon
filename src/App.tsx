import React, { Component } from 'react';
import Menu from './components/menu';
import Tabs, { TabPane } from './components/tabs';
import Icon from './components/icon';

import './assets/style/normalize.less';
import './assets/style/index.less';

const MenuItem = Menu.Item;

export default class App extends Component{

  public render() {
    return (
      <div>
        <Menu style={{ width: 300 }}>
          {[1,2,3].map(i => <MenuItem key={i}>{i}</MenuItem>)}
        </Menu>

        <Tabs>
          <TabPane key="1" tab="1111">911111</TabPane>
          <TabPane key="2" tab="2222">922222</TabPane>
          <TabPane key="3" tab="3333">933333</TabPane>
          <TabPane key="4" tab="4444">944444</TabPane>
        </Tabs>
        <Icon type="riliW" />
      </div>
    );
  }
}
