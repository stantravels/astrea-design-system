import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Canvas,
  Controls,
  Heading,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import {
  HorizontalTabNavigation,
  VerticalTabNavigation,
  type TabNavigationItem,
} from './Tabs';

const horizontalItems = [
  { value: 'tab-1', text: 'Tab name' },
  { value: 'tab-2', text: 'Tab name' },
  { value: 'tab-3', text: 'Tab name' },
  { value: 'tab-4', text: 'Tab name' },
  { value: 'tab-5', text: 'Tab name' },
] satisfies readonly TabNavigationItem[];

const verticalItems = [
  { value: 'tab-1', text: 'Tab name' },
  { value: 'tab-2', text: 'Tab name' },
  { value: 'tab-3', text: 'Tab name' },
  { value: 'tab-4', text: 'Tab name' },
  { value: 'tab-5', text: 'Tab name' },
] satisfies readonly TabNavigationItem[];

const meta = {
  title: 'Components/Tab Navigation',
  component: HorizontalTabNavigation,
  tags: ['autodocs'],
  args: {
    items: horizontalItems,
    defaultSelected: 'tab-1',
  },
  argTypes: {
    items: {
      control: false,
    },
    onSelectedChange: {
      control: false,
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            Tab Navigation built as a composition of `Tab` items matching the two organism
            layouts from Figma.
          </Subtitle>
          <Heading>Horizontal</Heading>
          <Canvas of={Horizontal} />
          <Heading>Vertical</Heading>
          <Canvas of={Vertical} />
          <Heading>API</Heading>
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
} satisfies Meta<typeof HorizontalTabNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <HorizontalTabNavigation {...args} />,
};

export const Horizontal: Story = {
  args: {
    items: horizontalItems,
    defaultSelected: 'tab-1',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Vertical: Story = {
  render: (args) => <VerticalTabNavigation {...args} items={verticalItems} />,
  args: {
    defaultSelected: 'tab-1',
  },
  parameters: {
    layout: 'padded',
  },
};
