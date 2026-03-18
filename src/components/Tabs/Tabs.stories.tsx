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

const purpose = [
  'Provide an efficient way to organize and navigate related content within a single interface.',
  'Enable users to switch between content sections quickly while maintaining context and focus.',
  'Enhance usability with consistent styling, accessibility, and intuitive interaction.',
] as const;

const whenToUse = [
  'Content organization, for example Overview, Details, and Reviews on a product page.',
  'Form segmentation in complex forms such as Personal Info, Address, and Preferences.',
  'Data views in dashboards, for example Daily, Weekly, and Monthly metrics.',
  'Space-constrained interfaces where several related content views must stay on the same page.',
] as const;

const whenNotToUse = [
  'Primary navigation for the whole site or application.',
  'Sequential step-by-step workflows that should use a dedicated step navigation pattern.',
  'Single-content views that do not need switching.',
  'Deep, nested hierarchies where tabs become hard to scan and understand.',
] as const;

const accessibility = [
  'Use a clear `aria-label` or `aria-labelledby` for the tablist.',
  'Support keyboard navigation with arrow keys, Home, End, Enter, and Space.',
  'Use semantic roles and state: `tablist`, `tab`, and `aria-selected`.',
  'Keep text contrast at least 4.5:1 and non-text indicators at least 3:1.',
  'Maintain touch targets of at least 44x44 pixels.',
  'Provide visible focus indicators and ensure screen readers announce the selected tab clearly.',
] as const;

const bestPractices = [
  'Keep labels concise and descriptive.',
  'Use clear visual feedback for active, hover, pressed, and focused states.',
  'Arrange tabs in a logical order and keep the number manageable.',
  'Adapt layouts responsively for smaller screens.',
  'Ensure each tab clearly maps to its associated content.',
] as const;

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

function DocsList({ items }: { items: readonly string[] }) {
  return (
    <ul style={{ margin: '0 0 24px', paddingLeft: '20px', lineHeight: 1.6 }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: '8px' }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

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
    a11y: {
      test: 'error',
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            Tab Navigation built as a composition of `Tab` items matching the two organism
            layouts from Figma.
          </Subtitle>
          <Heading>Purpose</Heading>
          <DocsList items={purpose} />
          <Heading>When to Use</Heading>
          <DocsList items={whenToUse} />
          <Heading>When Not to Use</Heading>
          <DocsList items={whenNotToUse} />
          <Heading>Accessibility</Heading>
          <DocsList items={accessibility} />
          <p>
            The current implementation follows a manual activation pattern: arrow keys move
            focus between tabs, <code>Home</code> and <code>End</code> jump to the first and
            last tab, and <code>Enter</code> or <code>Space</code> activates the focused tab.
          </p>
          <p>
            `Tab Navigation` handles <code>role=&quot;tablist&quot;</code>,{' '}
            <code>role=&quot;tab&quot;</code>, <code>aria-selected</code>, roving tab index, and
            visible focus treatment. Panel markup and <code>aria-controls</code> /{' '}
            <code>role=&quot;tabpanel&quot;</code> should be wired by the consuming screen when
            real content panels are present.
          </p>
          <Heading>Best Practices</Heading>
          <DocsList items={bestPractices} />
          <Heading>Playground</Heading>
          <Canvas of={Playground} />
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
