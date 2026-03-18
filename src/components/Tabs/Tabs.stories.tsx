import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const demoItems = [
  {
    value: 'overview',
    label: 'Overview',
    content: 'Overview content for the selected tab.',
  },
  {
    value: 'tokens',
    label: 'Tokens',
    badge: '24',
    content: 'Token documentation and implementation notes.',
  },
  {
    value: 'patterns',
    label: 'Patterns',
    content: 'Patterns, responsive behavior, and composition guidance.',
  },
] as const;

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    items: demoItems,
    size: 'md',
    fullWidth: false,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
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
