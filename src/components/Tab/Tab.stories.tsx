import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Canvas,
  Controls,
  Heading,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { Tab } from './Tab';

const purpose = [
  'Provide a reusable tab building block composed from `.Tab base` and `.Tab states` in Figma.',
  'Support consistent visual states, icon slots, and optional counter content before the component is assembled into Tab Navigation.',
] as const;

const bestPractices = [
  'Use concise labels that clearly preview the associated content.',
  'Reserve icons and counters for cases where they add real scanning value, not as decoration.',
  'Use `Tab Navigation` for interactive behavior. `Tab` alone is a presentational building block.',
] as const;

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
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: {
    layout: 'Horizontal',
    selected: false,
    state: 'Default',
    text: 'Tab name',
    showIconBefore: true,
    iconBefore: 'information',
    showIconAfter: true,
    iconAfter: 'arrow_right',
    showCounter: true,
    counter: '2',
  },
  argTypes: {
    text: {
      control: 'text',
    },
    iconBefore: {
      control: 'text',
      description: `Material Design Icons name.`,
    },
    iconAfter: {
      control: 'text',
      description: `Material Design Icons name.`,
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
            Presentational tab building block aligned with `.Tab base` and `.Tab states` in
            Figma.
          </Subtitle>
          <Heading>Purpose</Heading>
          <DocsList items={purpose} />
          <Heading>Accessibility</Heading>
          <p>
            This component is intentionally presentational. Use it inside <code>Tab Navigation</code>{' '}
            or another semantic wrapper that provides <code>role=&quot;tablist&quot;</code>,{' '}
            <code>role=&quot;tab&quot;</code>, keyboard navigation, and panel relationships.
          </p>
          <p>
            The focused visual state uses the Figma focus border token and should be driven by
            real keyboard focus in the interactive navigation component.
          </p>
          <Heading>Best Practices</Heading>
          <DocsList items={bestPractices} />
          <Heading>Playground</Heading>
          <Canvas of={Playground} />
          <Heading>Examples</Heading>
          <Canvas of={Examples} />
          <Heading>API</Heading>
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tab layout="Horizontal" selected={false} state="Default" showIconBefore={false} text="Text only" />
      <Tab layout="Horizontal" selected={false} state="Default" text="Icon before" showIconBefore iconBefore="information" />
      <Tab layout="Horizontal" selected={false} state="Default" showIconBefore={false} text="Icon after" showIconAfter iconAfter="arrow_right" />
      <Tab layout="Horizontal" selected={false} state="Default" showIconBefore={false} text="Counter" showCounter counter="2" />
      <Tab layout="Horizontal" selected state="Default" showIconBefore={false} text="Counter" showCounter counter="2" />
      <Tab layout="Horizontal" selected={false} counterActive showIconBefore={false} state="Default" text="Indicator" showCounter counter="" />
    </div>
  ),
};
