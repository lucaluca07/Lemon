import cx from 'classnames';
import * as React from 'react';
import './spin.less';

export interface SpinProps {
  spinning: boolean;
  style?: React.CSSProperties;
  delay?: number;
  mask?: boolean;
  indicator: React.ReactNode;
}

const Spin: React.SFC<SpinProps> = ({
  spinning,
  children,
  style,
  mask,
  indicator,
}) => {
  const [_spinning, setSpinning] = React.useState(spinning || true);

  React.useEffect(() => {
    setSpinning(spinning);
  }, [spinning]);

  const classString = cx('lemon-spin', {
    'lemon-spin-wrap-child': children,
    'lemon-spin-wrap-parent': !children,
    'lemon-spin-mask': mask,
    'lemon-spin-hide': !_spinning,
  });

  return (
    <div style={style} className={classString}>
      <div className="lemon-spin-loading">{indicator}</div>
      {children}
    </div>
  );
};

export default Spin;
