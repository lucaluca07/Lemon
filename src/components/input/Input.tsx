import * as React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import TextArea from './TextArea';
import './input.less';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  allowClear?: boolean;
}

export default class Input extends React.Component<InputProps, any> {
  static TextArea: typeof TextArea;

  input: HTMLInputElement;

  constructor(props: InputProps) {
    super(props);
    const value =
      typeof props.value === 'undefined' ? props.defaultValue : props.value;
    console.log(1111, value);
    this.state = {
      value,
    };
  }

  static getDerivedStateFromProps(nextProps: InputProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  saveInput = (node: HTMLInputElement) => {
    this.input = node;
  };

  setValue(
    value: string,
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent>,
    callback?: () => void,
  ) {
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
    const { onChange } = this.props;
    if (onChange) {
      let event = e;
      if (e.type === 'click') {
        // click clear icon
        event = Object.create(e);
        event.target = this.input;
        event.currentTarget = this.input;
        const originalInputValue = this.input.value;
        // change input value cause e.target.value should be '' when clear input
        this.input.value = '';
        onChange(event as React.ChangeEvent<HTMLInputElement>);
        // reset input value
        this.input.value = originalInputValue;
        return;
      }
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setValue('', e, () => {
      this.focus();
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value, e);
  };

  public focus = () => {
    this.input.focus();
  };

  public blur = () => {
    this.input.blur();
  };

  render() {
    const {
      icon,
      allowClear,
      addonBefore,
      addonAfter,
      disabled,
      style,
      placeholder,
      className,
    } = this.props;
    const { value } = this.state;
    const classString = classnames('l-input-root', className);
    return (
      <span style={style} className={classString}>
        {addonBefore}
        <span className="l-input-wrapper">
          {icon && <Icon type={icon} />}
          <input
            className="l-input"
            type="text"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            placeholder={placeholder}
            ref={this.saveInput}
            value={value}
          />
          {allowClear && !disabled && value && (
            <Icon onClick={this.handleReset} type="close" />
          )}
        </span>
        {addonAfter}
      </span>
    );
  }
}
