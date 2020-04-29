import React, { useMemo, useCallback, useState, useEffect } from 'react';
import Popup from './Popup';

let tooltipIndex = 0;

interface IProps {
  title: React.ReactNode;
  trigger?: 'click' | 'hover';
}

const Tooltip: React.FC<IProps> = ({ children, title, trigger = 'hover' }) => {
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState({ height: 0, left: 0, top: 0, width: 0 });
  const fireEvents = useCallback(
    (type: string, e: Event) => {
      const childCallback = (children as React.ReactElement).props[type];
      if (childCallback) {
        childCallback(e);
      }
    },
    [children],
  );

  const child = useMemo(
    () => React.Children.only(children) as React.ReactElement,
    [children],
  );

  const cl = useMemo(() => `tooltip-index-${tooltipIndex++}`, []);

  const className = useMemo(() => {
    const className = (children as React.ReactElement).props.className || '';
    return `${className} ${cl}`;
  }, [children]);

  const toggleVisible = useCallback(() => {
    if (visible) {
      setVisible(false);
    } else {
      const triggerNode = document.querySelector(`.${cl}`);
      if (!triggerNode) return;
      const { top, height, left, width } = triggerNode.getBoundingClientRect();
      setRect({ top, height, left, width });
      setVisible(true);
    }
  }, [visible, cl]);

  const onClick = useCallback(
    (event) => {
      fireEvents('onClick', event);
      if (trigger === 'hover') return;
      toggleVisible();
    },
    [toggleVisible, trigger],
  );

  const onMouseOver = useCallback(
    (event) => {
      fireEvents('onMouseOver', event);
      if (trigger === 'click') return;
      const triggerNode = document.querySelector(`.${cl}`);
      if (!triggerNode) return;
      const { top, height, left, width } = triggerNode.getBoundingClientRect();
      setRect({ top, height, left, width });
      setVisible(true);
    },
    [cl, trigger],
  );
  const onMouseLeave = useCallback(
    (event) => {
      fireEvents('onMouseLeave', event);
      if (trigger === 'click') return;
      setVisible(false);
    },
    [trigger],
  );

  return (
    <>
      {React.cloneElement(child, {
        onClick,
        className,
        onMouseOver,
        onMouseLeave,
      })}
      <Popup {...rect} title={title} visible={visible} />
    </>
  );
};

export default Tooltip;
