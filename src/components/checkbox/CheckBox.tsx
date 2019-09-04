import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import './checkbox.less';

export interface CheckBoxProps {
  className?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  onChange?: (e: CheckboxChangeEvent) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.MouseEventHandler<HTMLElement>;
}

export interface CheckboxChangeEventTarget extends CheckBoxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

const CheckBox: React.SFC<CheckBoxProps> = ({
  className,
  value,
  checked,
  defaultChecked = false,
  children,
  disabled
}) => {
  const [_checked, setChecked] = React.useState<boolean>(
    checked === undefined ? defaultChecked : checked
  );

  const classString = classnames(className, 't-checkbox', {
    't-checkbox-disabled': disabled,
    't-checkbox-checked': _checked
  });

  return (
    <label className={classString}>
      <input className="t-input" onClick={() => { setChecked(!_checked); }} checked={!!_checked} value={value} type="checkbox"/>
      <span className="t-checkbox-inner" />
      {children !== undefined && <span>{children}</span>}
    </label>
  );
};

CheckBox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  style: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func
};

export default CheckBox;