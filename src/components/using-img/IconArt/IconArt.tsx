import React from 'react';
import cc from 'classcat';
import { IconArtType, ThemeType } from './IconArt.types';
import './IconArt.css';

const CDN_PATH = 'https://cdn.jsdelivr.net/gh/oriyan-ovadia/static@master/icons/lemonade-art';

export interface IconProps extends React.HTMLAttributes<HTMLImageElement> {
  icon: IconArtType;
  size?: 'sm' | 'md' | 'lg';
  theme?: ThemeType;
}

/**
 * IconArt component displays delightful and artistic illustration icons, enhancing the overall user experience with a touch of visual charm.
 *
 * Icons use SVG icons served by a CDN using an `<img>` tag.
 */
export const IconArt = ({ icon, size = 'md', theme = 'light', ...restProps }: IconProps) => {
  return (
    <span className={cc(['IconArt_root', `IconArt--${size}`])} {...restProps}>
      <img alt="" src={`${CDN_PATH}/${icon}-art-${theme}.svg`} {...restProps} />
    </span>
  );
};
