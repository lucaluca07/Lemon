import React, { useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createPopper, Instance } from '@popperjs/core';
const Example: React.FC = ({ children }) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ instance: Instance | null }>({ instance: null });

  const onClick = useCallback(
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
                  offset: [0, 4],
                },
              },
            ],
          },
        );
      }
      if (popperElement.getAttribute('data-show')) {
        popperElement.removeAttribute('data-show');
      } else {
        popperElement.setAttribute('data-show', 'visible');
      }
    },
    [children, popperRef.current],
  );

  const childNode = useMemo(() => {
    const child = React.Children.only(children) as React.ReactElement;
    return React.cloneElement(child, { onClick });
  }, [onClick, children]);

  return (
    <>
      {childNode}
      {ReactDOM.createPortal(
        <div className="popover" ref={popperRef} role="popover">
          <div className="arrow" data-popper-arrow />
          <span>Popper</span>
        </div>,
        document.body,
      )}
    </>
  );
};

export default Example;
