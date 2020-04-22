import React from 'react';

const Button: React.FC = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

export default Button;
