import React, { memo, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import copy from 'copy-to-clipboard';
import { IconType, iconsArr } from './Icon.types';
import { Tooltip } from '../../storybook/Tooltip/Tooltip';
import { useDebounce } from '../../../hooks/useDebounce';
import { TextInput } from '../../storybook/TextInput/TextInput';
import { FormLabel } from '../../storybook/FormLabel/FormLabel';
import { HStack } from '../../storybook/HStack/HStack';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Using Inline SVG/Icon',
  component: Icon,
  tags: ['autodocs']
} satisfies Meta<typeof Icon>;

export default meta;

export const Primary: Story = {
  render: (args) => {
    return <Icon {...args}></Icon>;
  },
  args: {
    icon: 'hard-drive'
  }
};

export const Size: Story = {
  render: (args) => {
    return (
      <HStack gap="md">
        <Icon {...args} size="sm" />
        <Icon {...args} size="md" />
        <Icon {...args} size="lg" />
      </HStack>
    );
  },
  args: {
    icon: 'flower'
  },
  parameters: {
    docs: {
      description: {
        story: `Icon supports the following sizes:
* \`sm\` 24x24
* \`md\` 28x28
* \`lg\` 32x32
          `
      }
    }
  }
};

export const WithColor: Story = {
  render: (args) => {
    return (
      <HStack gap="md">
        <Icon
          style={{
            color: '#ff0083'
          }}
          {...args}
        />
        <Icon
          style={{
            color: '#4c8ad0'
          }}
          {...args}
        />
        <Icon
          style={{
            color: '#22B28C'
          }}
          {...args}
        />
        <Icon
          style={{
            color: '#FA8D2A'
          }}
          {...args}
        />
      </HStack>
    );
  },
  args: {
    icon: 'heart'
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon will inherit the current text color.'
      }
    }
  }
};

const AllIcons = memo(({ icons }: { icons: IconType[] }) => {
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
                <Icon icon={iconName} size="md" />
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
    const [icons, setIcons] = useState(iconsArr);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
      const { value } = event.target;
      setSearchQuery(value);
    }

    useEffect(() => {
      const searchResults = iconsArr.filter((iconName) => {
        return iconName.includes(debouncedSearchQuery);
      });

      setIcons(searchResults);
    }, [debouncedSearchQuery]);

    return (
      <div>
        <form style={{ paddingInline: '30px' }}>
          <FormLabel htmlFor="search-icon-input">Search icon</FormLabel>
          <TextInput id="search-icon-input" onChange={onSearch} value={searchQuery} />
        </form>
        <AllIcons icons={icons} />
      </div>
    );
  },
  // @ts-ignore
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Browse and search icons, copy their names to the clipboard by clicking them.'
      }
    }
  }
};
