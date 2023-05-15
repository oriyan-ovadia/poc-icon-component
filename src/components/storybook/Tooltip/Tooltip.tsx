import React, { ReactNode } from 'react';
import './Tooltip.css';
import * as RadixTooltip from '@radix-ui/react-tooltip';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  isOpen?: boolean;
}

const Tooltip = ({ children, content, isOpen }: TooltipProps) => {
  return (
    <RadixTooltip.Provider delayDuration={120}>
      <RadixTooltip.Root open={isOpen}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Content className="Tooltip_content">{content}</RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export { Tooltip };
