import React, { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from 'src/store/reducer';
import Menu, { SubMenu, MenuItem } from 'src/components/menu';
import CommonAdd from 'src/components/common-add';
import { addProject } from 'src/store/menus';
import Modal from 'src/components/modal';
import ModalContent from './ModalContent';

const SideBar: React.FC = () => {
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const menus = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch();
  const history = useHistory();
  const { bases, projects } = menus;

  const handleOk = useCallback(() => {
    dispatch(addProject({ name }));
    setName('');
    setVisible(false);
  }, [name]);

  const location = useLocation();
  const defaultSelectedKeys = useMemo(() => {
    const menuPaths = [
      ...bases.map((menu) => `/${menu.id}`),
      ...projects.map((project) => `/project/${project.id}`),
    ];
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
            projects
              .filter((item) => !item.hide)
              .map((item) => (
                <MenuItem eventKey={`/project/${item.id}`} key={item.id}>
                  <i className="iconfont icon-drag menu-icon drag-element" />
                  {item.name}
                </MenuItem>
              ))}
          {!projects.length && (
            <div className="empty">
              <i className="iconfont icon-empty" />
              <span>暂无项目</span>
            </div>
          )}
          <CommonAdd
            className="add-project"
            name="添加项目"
            onClick={() => setVisible(true)}
          />
        </SubMenu>
      </Menu>
      <Modal
        visible={visible}
        header="添加项目"
        onCancel={() => setVisible(false)}
        onOk={handleOk}
      >
        <ModalContent
          onChange={(type, value) => {
            if (type === 'name') {
              setName(value);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default SideBar;
