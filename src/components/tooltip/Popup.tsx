import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  top: number;
  left: number;
  height: number;
  width: number;
  visible: boolean;
  title: React.ReactNode;
}

const Popup: React.FC<IProps> = ({
  top,
  left,
  height,
  visible,
  title,
  width,
}) => {
  const [offsetX, setOffsetX] = useState(0);
  const [hide, setHide] = useState(!visible);
  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    // 延迟处理等待 render 完成
    setTimeout(() => {
      const w = node.offsetWidth;
      const offsetX = (w - width) / 2;
      setOffsetX(offsetX);
    }, 0);
  }, [nodeRef.current, width]);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (visible) {
      setHide(false);
      node.animate([{ opacity: 0.5 }, { opacity: 1 }], {
        duration: 150,
        fill: 'both',
      });
    } else {
      node.animate([{ opacity: 0.5 }, { opacity: 1 }], {
        duration: 150,
        fill: 'both',
        direction: 'reverse',
      });
      setTimeout(() => {
        setHide(true);
      }, 150);
    }
  }, [visible]);

  return createPortal(
    <div
      ref={nodeRef}
      style={{
        top: top + height + 5,
        left: left - offsetX,
        display: hide ? 'none' : 'block',
      }}
      className="popup"
    >
      <div className="popup-inner">{title}</div>
      <div className="popup-arrow" />
    </div>,
    document.body,
  );
};

export default Popup;
