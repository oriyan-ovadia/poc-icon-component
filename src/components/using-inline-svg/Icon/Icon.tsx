import React, { useEffect, useState } from 'react';
import cc from 'classcat';
import { IconType } from './Icon.types';
import './Icon.css';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Icons can be used to represent concepts or provide context to options and/or actions within an experience.
 *
 * Icons use SVG icons from [Lucide](https://lucide.dev/icons). They're loaded using [SVGR](https://react-svgr.com/) and minified using [SVGO](https://github.com/svg/svgo).
 */
export const Icon = ({ icon, size = 'md', ...restProps }: IconProps) => {
  const [LazyIcon, setLazyIcon] = useState(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        const { default: importedIcon } = await import(`./icons/${icon}.svg`);
        setLazyIcon(importedIcon);
      } catch (error) {
        console.warn(`Failed to load icon: \`${icon}\``);
      }
    };
    importIcon();
  }, [icon]);

  if (!LazyIcon) {
    return null;
  }

  return (
    <span className={cc(['Icon_root', `Icon--${size}`])} {...restProps}>
      {LazyIcon}
    </span>
  );
};
