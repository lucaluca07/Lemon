import * as React from 'react';
import Menu from '../../components/menu';
import Tabs, { TabPane } from '../../components/tabs';
import Item from './Item';
import './index.less';

const MenuItem = Menu.Item;

const list1 = [
  { name: '收件箱', icon: 'inbox' },
  { name: '最近7天', icon: 'calendar-w' },
  { name: '日历', icon: 'calendar' },
];

const list2 = [
  { name: '时间轴', icon: 'timeline' },
  { name: '废纸篓', icon: 'lajitong' },
];

export default class Slider extends React.Component {
  render() {
    const today = (new Date()).getDate();
    return (
      <>
        <Menu style={{ padding: '5px 10px' }}>
          <MenuItem>
            <Item icon={`calendar-${today}`} name="今天" />
          </MenuItem>
          {list1.map(i => (
            <MenuItem key={i.name}>
              <Item icon={i.icon} name={i.name} />
            </MenuItem>
          ))}
        </Menu>
        <Menu style={{ margin: '10px 10px 0px' }}>
          {list2.map(i => (
            <MenuItem key={i.name}>
              <Item icon={i.icon} name={i.name} />
            </MenuItem>
          ))}
        </Menu>
        <Tabs style={{ flex: 1 }}>
          <TabPane key="1" tab="清单">
            <Menu style={{}}>
              {[1, 2, 3, 4, 5].map(i => (
                <MenuItem key={i}>{'清单' + i}</MenuItem>
              ))}
              <MenuItem>添加清单</MenuItem>
            </Menu>
          </TabPane>
          <TabPane key="2" tab="计划">
            <Menu style={{}}>
              {[1, 2, 3, 4, 5].map(i => (
                <MenuItem key={i}>{'计划' + i}</MenuItem>
              ))}
              <MenuItem>添加计划</MenuItem>
            </Menu>
          </TabPane>
          <TabPane key="3" tab="标签">
            <Menu style={{}}>
              {[1, 2, 3, 4, 5].map(i => (
                <MenuItem key={i}>{'标签' + i}</MenuItem>
              ))}
              <MenuItem>添加标签</MenuItem>
            </Menu>
          </TabPane>
        </Tabs>
      </>
    );
  }
}
