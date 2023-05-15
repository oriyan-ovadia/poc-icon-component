import React, { memo, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconArt } from './IconArt';
import copy from 'copy-to-clipboard';
import { IconArtType, ThemeType, iconArtArr } from './IconArt.types';
import { ButtonToggleGroup } from '../../storybook/ButtonToggleGroup/ButtonToggleGroup';
import { Tooltip } from '../../storybook/Tooltip/Tooltip';
import { HStack } from '../../storybook/HStack/HStack';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Using Img/IconArt',
  component: IconArt,
  tags: ['autodocs']
} satisfies Meta<typeof IconArt>;

export default meta;

export const Primary: Story = {
  render: (args) => {
    return <IconArt {...args}></IconArt>;
  },
  args: {
    icon: 'dog-face'
  }
};

export const Theme: Story = {
  render: (args) => {
    return (
      <HStack gap="md">
        <IconArt {...args} icon="dog-face" theme="light" />
        <IconArt {...args} icon="dog-face" theme="dark" />
        <IconArt {...args} icon="cat-face" theme="light" />
        <IconArt {...args} icon="cat-face" theme="dark" />
      </HStack>
    );
  },
  // @ts-ignore
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "By using the `theme` prop, the icon can adjust itself according to the app's theme. The default is `light`."
      }
    }
  }
};

const AllIcons = memo(({ icons, theme }: { icons: IconArtType[]; theme: ThemeType }) => {
  const [copiedIconName, setCopiedIconName] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (copiedIconName) {
      timeout = setTimeout(() => {
        setCopiedIconName('');
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [copiedIconName]);

  function onClick(iconName: string) {
    copy(iconName);

    if (copiedIconName !== iconName || !copiedIconName) {
      setCopiedIconName(iconName);
    }
  }

  return (
    <div className="icon-grid">
      {icons.map((iconName) => {
        const isCopied = iconName === copiedIconName;

        return (
          <div className="icon-btn-wrapper" key={iconName}>
            <Tooltip
              content={isCopied ? 'Copied to clipboard' : iconName}
              isOpen={copiedIconName && isCopied ? true : undefined}>
              <button className="btn-icon" onClick={() => onClick(iconName)}>
                <IconArt icon={iconName} size="md" theme={theme} />
              </button>
            </Tooltip>
            <div className="icon-name">{iconName}</div>
          </div>
        );
      })}
    </div>
  );
});

export const IconExplorer: Story = {
  render: (args) => {
    const [theme, setThemeColor] = useState<ThemeType>('light');

    function onToggleThemeColor(value: string) {
      setThemeColor(value as ThemeType);
    }

    return (
      <div>
        <div style={{ marginInline: '30px' }}>
          <ButtonToggleGroup defaultValue="light" onChange={onToggleThemeColor}>
            <ButtonToggleGroup.Button value="light">Light</ButtonToggleGroup.Button>
            <ButtonToggleGroup.Button value="dark">Dark</ButtonToggleGroup.Button>
          </ButtonToggleGroup>
        </div>
        <AllIcons icons={iconArtArr} theme={theme} />
      </div>
    );
  },
  // @ts-ignore
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Browse icons, copy their names to the clipboard by clicking them, and view them in different theme color.'
      }
    }
  }
};
