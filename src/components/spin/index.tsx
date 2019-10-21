import * as React from 'react';
import BaseSpin from './Spin';

import './index.less';

export interface SpinProps {
  spinning: boolean;
  mask?: boolean;
  indicator?: React.ReactNode;
  style?: React.CSSProperties;
}

const DefaultIndicator = () => <span className="lemon-spin-indicator"/>;

const Spin: React.SFC<SpinProps> = ({ spinning, children, mask, indicator, style }) => {
  const node = indicator || <DefaultIndicator/>;
  return (
    <BaseSpin
      spinning={spinning}
      indicator={node}
      mask={mask}
      style={style}
    >
      {children}
    </BaseSpin>
  );
};

export default Spin;
