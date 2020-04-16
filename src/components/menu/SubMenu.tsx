import React, {
  useContext,
  useMemo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import classNames from 'classnames';
import menuContext from './store';

interface SubMenuProps {
  title: React.ReactNode;
  eventKey: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ title, children, eventKey }) => {
  const { state, dispatch } = useContext(menuContext);
  const [visible, setVisible] = useState(state?.openKeys.includes(eventKey));
  const isOpen = useMemo(() => {
    return state?.openKeys.includes(eventKey);
  }, [state?.openKeys, eventKey]);

  const menuRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 300);
    if (!menuRef.current) return;
    const el = menuRef.current;
    if (isOpen) {
      el.style.height = 'auto';
      const height = window.getComputedStyle(el).height;
      console.log(height);
      console.log(window.getComputedStyle(el).height);
      el.style.height = '0';
      // 不设定延迟height不会有动画
      setTimeout(function () {
        el.style.height = height;
        el.style.opacity = '1';
      }, 0);
    } else {
      el.style.height = '0px';
      el.style.opacity = '0';
    }
  }, [isOpen]);

  return (
    <li
      className={classNames('menu-submenu', {
        'menu-submenu-open': isOpen,
      })}
    >
      <div
        onClick={() => {
          dispatch?.({
            type: 'UPDATE_OPEN_KEYS',
            payload: isOpen ? [] : [eventKey],
          });
        }}
        className={classNames('menu-submenu-title')}
      >
        <i className="menu-submenu-arrow" />
        <span>{title}</span>
      </div>
      <ul
        ref={menuRef}
        className={classNames('menu', { 'menu-hidden': !visible })}
      >
        {children}
      </ul>
    </li>
  );
};

export default SubMenu;
