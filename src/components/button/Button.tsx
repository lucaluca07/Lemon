import React, { useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';

interface BaseButtonProps {
  type?:
    | 'default'
    | 'primary'
    | 'ghost'
    | 'dashed'
    | 'danger'
    | 'link'
    | 'icon';
  size?: 'default' | 'large' | 'small';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  title?: string;
}

export type ButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type'>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  size = 'default',
  title,
  onClick,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<{ timer: number | null }>({ timer: null });
  const onMouseEnter = useCallback(() => {
    if (!title || !btnRef.current) return;
    timerRef.current.timer = window.setTimeout(() => {
      btnRef?.current?.setAttribute('data-title', title);
    }, 800);
  }, [title, btnRef.current]);
  const onMouseLeave = useCallback(() => {
    if (timerRef.current.timer) {
      clearTimeout(timerRef.current.timer);
    }
    btnRef?.current?.removeAttribute('data-title');
  }, [btnRef.current, timerRef.current]);

  const handleClick = useCallback(
    (e) => {
      onClick?.(e);
      if (timerRef.current.timer) {
        clearTimeout(timerRef.current.timer);
      }
      btnRef?.current?.removeAttribute('data-title');
    },
    [btnRef.current, timerRef.current],
  );
  return (
    <button
      className={classNames('button', className, {
        [`button-type-${type}`]: type,
        [`button-size-${size === 'large' ? 'lg' : 'sm'}`]: size,
      })}
      ref={btnRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
