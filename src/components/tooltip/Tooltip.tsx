import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { supportRef, composeRef } from 'src/utils/ref';

interface IProps {
  children: React.ReactNode;
  visible?: boolean;
}

const Tooltip: React.FC<IProps> = ({ children, visible }) => {
  const childRef = useRef(null);

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

  const onClick = useCallback((event) => {
    console.log(visible);
    fireEvents('onClick', event);
    console.log('tooltip onClick', childRef);
  }, []);

  const ref = useMemo(() => {
    if (supportRef(child)) {
      return composeRef(childRef, (child as any).ref);
    }
    return undefined;
  }, [child]);

  return React.cloneElement(child, {
    ref,
    onClick,
    className: 'test',
  });
};

export default Tooltip;
