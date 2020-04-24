import React, { useMemo, useCallback, useState, useEffect } from 'react';
import Popup from './Popup';

let tooltipIndex = 0;

const Tooltip: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState({ height: 0, left: 0, top: 0 });
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
      const { top, height, left } = triggerNode.getBoundingClientRect();
      setRect({ top, height, left });
      setVisible(true);
    }
  }, [visible, cl]);

  const onClick = useCallback(
    (event) => {
      fireEvents('onClick', event);
      toggleVisible();
    },
    [toggleVisible],
  );

  return (
    <>
      {React.cloneElement(child, {
        onClick,
        className,
      })}
      <Popup {...rect} visible={visible} />
    </>
  );
};

export default Tooltip;
