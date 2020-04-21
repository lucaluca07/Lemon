import React, { useMemo, useCallback } from 'react';

const Tooltip: React.FC = ({ children }) => {
  const fireEvents = (type: string, e: Event) => {
    const childCallback = (children as React.ReactElement).props[type];
    if (childCallback) {
      childCallback(e);
    }
  };

  const child = useMemo(
    () => React.Children.only(children) as React.ReactElement,
    [children],
  );

  const onClick = useCallback((event) => {
    fireEvents('onClick', event);
    console.log('tooltip onClick');
  }, []);

  return React.cloneElement(child, { onClick, className: 'test' });
};

export default Tooltip;
