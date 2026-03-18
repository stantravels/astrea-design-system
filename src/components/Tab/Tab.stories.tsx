import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Canvas,
  Controls,
  Heading,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { recommendedIconNames } from '../Icon/iconNames';
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
    iconBefore: 'search',
    showIconAfter: true,
    iconAfter: 'arrow_right',
    showCounter: true,
    counter: '17',
  },
  argTypes: {
    text: {
      control: 'text',
    },
    iconBefore: {
      control: 'text',
      description: `Material Design Icons name. Recommended examples: ${recommendedIconNames.join(', ')}.`,
    },
    iconAfter: {
      control: 'text',
      description: `Material Design Icons name. Recommended examples: ${recommendedIconNames.join(', ')}.`,
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
          <Heading>API</Heading>
          <Controls />
          <Heading>Horizontal states</Heading>
          <Canvas of={HorizontalStates} />
          <Heading>Vertical states</Heading>
          <Canvas of={VerticalStates} />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const HorizontalStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Default" text="Default" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Default" text="Default" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Hover" text="Hover" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Hover" text="Hover" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Focused" text="Focused" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Focused" text="Focused" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      </div>
    </div>
  ),
};

export const VerticalStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px', width: '280px' }}>
      <Tab layout="Vertical" selected={false} state="Default" text="Default" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Default" text="Default" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Hover" text="Hover" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Hover" text="Hover" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Focused" text="Focused" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Focused" text="Focused" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrow_right" showIconBefore showIconAfter />
    </div>
  ),
};

export const BaseComposition: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tab layout="Horizontal" selected={false} state="Default" text="Text only" />
      <Tab layout="Horizontal" selected={false} state="Default" text="Icon before" showIconBefore iconBefore="search" />
      <Tab layout="Horizontal" selected={false} state="Default" text="Icon after" showIconAfter iconAfter="arrow_right" />
      <Tab layout="Horizontal" selected={false} state="Default" text="Counter" showCounter counter="17" />
    </div>
  ),
};
