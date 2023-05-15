import React, { ReactNode } from 'react';
import cc from 'classcat';
import './HStack.css';

export interface HStackProps {
  children?: ReactNode;
  gap?: 'sm' | 'md' | 'lg';
}

export const HStack = ({ children, gap = 'sm' }: HStackProps) => {
  return <div className={cc(['HStack_root', `HStack--${gap}`])}>{children}</div>;
};
