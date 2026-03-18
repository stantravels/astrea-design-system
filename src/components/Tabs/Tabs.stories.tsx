import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabNavigation } from './Tabs';

const horizontalItems = [
  {
    value: 'overview',
    label: 'Overview',
    content: 'Overview content for the selected tab.',
  },
  {
    value: 'tokens',
    label: 'Tokens',
    counter: '24',
    content: 'Token documentation and implementation notes.',
  },
  {
    value: 'patterns',
    label: 'Patterns',
    iconAfter: 'arrowRight',
    content: 'Patterns, responsive behavior, and composition guidance.',
  },
] as const;

const verticalItems = [
  {
    value: 'overview',
    label: 'Overview',
    iconBefore: 'search',
  },
  {
    value: 'tokens',
    label: 'Tokens',
    counter: '17',
  },
  {
    value: 'patterns',
    label: 'Patterns',
    iconAfter: 'arrowRight',
  },
  {
    value: 'guidelines',
    label: 'Guidelines',
  },
  {
    value: 'release-notes',
    label: 'Release Notes',
  },
] as const;

const meta = {
  title: 'Components/Tab Navigation',
  component: TabNavigation,
  tags: ['autodocs'],
  args: {
    items: horizontalItems,
    size: 'md',
    fullWidth: false,
    orientation: 'horizontal',
  },
} satisfies Meta<typeof TabNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: {
    items: horizontalItems,
    orientation: 'horizontal',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Vertical: Story = {
  args: {
    items: verticalItems,
    orientation: 'vertical',
    fullWidth: true,
    showPanel: false,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Compact: Story = {
  args: {
    size: 'sm',
  },
};
