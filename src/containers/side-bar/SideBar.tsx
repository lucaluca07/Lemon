import * as React from 'react';
import Menu, { SubMenu, MenuItem } from 'src/components/menu';
const list = ['收件箱', '今天', '未来7天'];

const SideBar: React.FC = () => {
  return (
    <div className="side-bar">
      <Menu selectedKeys={['收件箱']}>
        {list.map((item) => (
          <MenuItem eventKey={item} key={item}>
            {item}
          </MenuItem>
        ))}
        <SubMenu title="SubMenu" eventKey="subMenu">
          {list.map((item) => (
            <MenuItem eventKey={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </SubMenu>
        <SubMenu title="SubMenu" eventKey="subMenu1">
          {list.map((item) => (
            <MenuItem eventKey={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideBar;
