import React, { InputHTMLAttributes } from 'react';
import './TextInput.css';

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="TextInput_root" type="text" {...props} />;
};
