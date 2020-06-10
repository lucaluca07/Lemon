import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import classNames from 'classnames';

interface IProps {
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = forwardRef<
  { focus?: () => void; blur?: () => void },
  React.InputHTMLAttributes<any> & IProps
>(({ onEnter, className, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }),
    [inputRef.current],
  );

  return (
    <input
      style={props.style}
      ref={inputRef}
      className={classNames('input', className)}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          onEnter?.(e);
        }
      }}
      type="text"
      {...props}
    />
  );
});

export default Input;
