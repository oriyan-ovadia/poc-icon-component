import React, { useEffect, useState } from 'react';
import cc from 'classcat';
import { IconArtType, ThemeType } from './IconArt.types';
import './IconArt.css';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: IconArtType;
  size?: 'sm' | 'md' | 'lg';
  theme?: ThemeType;
}

/**
 * IconArt component displays delightful and artistic illustration icons, enhancing the overall user experience with a touch of visual charm.
 *
 * They're loaded using [SVGR](https://react-svgr.com/) and minified using [SVGO](https://github.com/svg/svgo).
 */
export const IconArt = ({ icon, size = 'md', theme = 'light', ...restProps }: IconProps) => {
  const [LazyIcon, setLazyIcon] = useState(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        const { default: importedIcon } = await import(`./icons/${icon}-art-${theme}.svg`);
        setLazyIcon(importedIcon);
      } catch (error) {
        console.warn(`Failed to load icon: \`${icon}\``);
      }
    };
    importIcon();
  }, [icon, theme]);

  if (!LazyIcon) {
    return null;
  }

  return (
    <span className={cc(['IconArt_root', `IconArt--${size}`])} {...restProps}>
      {LazyIcon}
    </span>
  );
};
