import React, { useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createPopper, Instance } from '@popperjs/core';
interface IProps {
  visible?: boolean;
  title: React.ReactNode | string;
}

const Tooltip: React.FC<IProps> = ({ children, title }) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ instance: Instance | null }>({ instance: null });

  const fireEvents = useCallback(
    (type: string, e: Event) => {
      const childCallback = (children as React.ReactElement).props[type];
      if (childCallback) {
        childCallback(e);
      }
    },
    [children],
  );

  const onMouseEnter = useCallback(
    (event) => {
      const referenceElement = event.currentTarget;
      const popperElement = popperRef.current;
      if (!popperElement) return;
      if (!instanceRef.current.instance) {
        instanceRef.current.instance = createPopper(
          referenceElement,
          popperElement,
          {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8],
                },
              },
            ],
          },
        );
      }
      popperElement.setAttribute('data-show', 'visible');
    },
    [popperRef.current],
  );
  const onMouseLeave = useCallback(
    (event) => {
      fireEvents('onMouseLeave', event);
      const popperElement = popperRef.current;
      if (!popperElement) return;
      popperElement.removeAttribute('data-show');
    },
    [popperRef.current],
  );

  const childNode = useMemo(() => {
    const child = React.Children.only(children) as React.ReactElement;
    return React.cloneElement(child, { onMouseLeave, onMouseEnter });
  }, [onMouseLeave, onMouseEnter, children]);

  return (
    <>
      {childNode}
      {ReactDOM.createPortal(
        <div className="tooltip" ref={popperRef} role="tooltip">
          <div className="arrow" data-popper-arrow />
          <span>{title}</span>
        </div>,
        document.body,
      )}
    </>
  );
};

export default Tooltip;
