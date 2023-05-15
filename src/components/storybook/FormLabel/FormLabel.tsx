import { LabelHTMLAttributes } from 'react';
import './FormLabel.css';

export const FormLabel = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label className="FormLabel_root" {...props} />;
};
