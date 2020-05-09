import React, { forwardRef, useRef, useImperativeHandle } from 'react';

const Input = forwardRef<
  { focus?: () => void; blur?: () => void },
  React.InputHTMLAttributes<any>
>((props, ref) => {
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
      type="text"
      {...props}
    />
  );
});

export default Input;
