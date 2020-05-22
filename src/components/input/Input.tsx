import React, { forwardRef, useRef, useImperativeHandle } from 'react';

interface IProps {
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = forwardRef<
  { focus?: () => void; blur?: () => void },
  React.InputHTMLAttributes<any> & IProps
>(({ onEnter, ...props }, ref) => {
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
      className="input"
      onKeyDown={(e) => {
        console.log(e.keyCode);
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
