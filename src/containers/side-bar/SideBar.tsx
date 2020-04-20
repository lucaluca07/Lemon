import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RootState } from 'src/store/reducer';
import Menu, { SubMenu, MenuItem } from 'src/components/menu';
import { addProject } from 'src/store/menus';
import Modal from 'src/components/modal';
import ModalContent from './ModalContent';

const SideBar: React.FC = () => {
  const menus = useSelector((state: RootState) => state.menus);
  const history = useHistory();
  const { bases, projects } = menus;

  const content = useMemo(() => {
    return <ModalContent />;
  }, []);

  const { open } = Modal.useModal({
    visible: false,
    header: '添加项目',
    content,
    onOk: () => {},
  });
  const location = useLocation();

  const defaultSelectedKeys = useMemo(() => {
    const menuPaths = [...bases, ...projects].map((menu) => `/${menu.id}`);
    const pathname = location.pathname;
    if (menuPaths.includes(pathname)) return [pathname];
    return ['/inbox'];
  }, []);

  const handleSelectedKeysChange = useCallback(
    (selectedKeys) => {
      const key = selectedKeys[0] || '';
      history.push(key);
    },
    [history],
  );

  return (
    <div className="side-bar">
      <Menu
        defaultSelectedKeys={defaultSelectedKeys}
        onSelectedKeysChange={handleSelectedKeysChange}
      >
        {bases.map((menu) => {
          return (
            <MenuItem eventKey={`/${menu.id}`} key={menu.id}>
              <i className={`iconfont icon-${menu.icon} menu-icon`} />
              <span>{menu.name}</span>
            </MenuItem>
          );
        })}
        <SubMenu title="项目" eventKey="projects">
          {!!projects.length &&
            projects.map((item) => (
              <MenuItem eventKey={`/project/${item.id}`} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          {!projects.length && <span className="empty">暂无项目</span>}
          <div className="add-project actions" onClick={open}>
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
