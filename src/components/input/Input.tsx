import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return <input className="input" type="text" />;
});

export default Input;
