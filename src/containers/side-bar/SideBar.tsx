import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/reducer';
import Menu, { SubMenu, MenuItem } from 'src/components/menu';
import { MenuState, addProject } from 'src/store/menus';
import classNames from 'classnames';

const SideBar: React.FC = () => {
  const menus = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch();
  const { bases, projects } = menus;
  return (
    <div className="side-bar">
      <Menu selectedKeys={['inbox']}>
        {bases.map((menu) => {
          return (
            <MenuItem eventKey={menu.id} key={menu.id}>
              <i className={`iconfont icon-${menu.icon} menu-icon`} />
              <span>{menu.name}</span>
            </MenuItem>
          );
        })}
        <SubMenu title="项目" eventKey="projects">
          {!!projects.length &&
            projects.map((item) => (
              <MenuItem eventKey={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          {!projects.length && <span className="empty">暂无项目</span>}
          <div
            className="add-project actions"
            onClick={() => {
              dispatch(addProject('项目一'));
            }}
          >
            <i className="iconfont icon-icon_add_round menu-icon" />
            <i className="iconfont icon-icon_add_fill menu-icon" />
            <span>添加项目</span>
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideBar;
