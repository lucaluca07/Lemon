import React from 'react';
import classNames from 'classnames';

interface BaseButtonProps {
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'danger' | 'link';
  size?: 'default' | 'large' | 'small';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export type ButtonProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type'>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  size = 'default',
  ...rest
}) => {
  return (
    <button
      className={classNames('button', className, {
        [`button-type-${type}`]: type,
        [`button-size-${size === 'large' ? 'lg' : 'sm'}`]: size,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
