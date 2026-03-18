import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Canvas,
  Heading,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { Tab } from './Tab';

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
    iconAfter: 'arrowRight',
    showCounter: true,
    counter: '17',
  },
  argTypes: {
    text: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            Tab component built directly from `.Tab base` and `.Tab states` in Figma.
          </Subtitle>
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
        <Tab layout="Horizontal" selected={false} state="Default" text="Default" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Default" text="Default" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Hover" text="Hover" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Hover" text="Hover" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Focused" text="Focused" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Focused" text="Focused" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tab layout="Horizontal" selected={false} state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
        <Tab layout="Horizontal" selected state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      </div>
    </div>
  ),
};

export const VerticalStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '12px', width: '280px' }}>
      <Tab layout="Vertical" selected={false} state="Default" text="Default" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Default" text="Default" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Hover" text="Hover" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Hover" text="Hover" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Pressed" text="Pressed" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Focused" text="Focused" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Focused" text="Focused" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected={false} state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
      <Tab layout="Vertical" selected state="Disabled" text="Disabled" iconBefore="search" iconAfter="arrowRight" showIconBefore showIconAfter />
    </div>
  ),
};

export const BaseComposition: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Tab layout="Horizontal" selected={false} state="Default" text="Text only" />
      <Tab layout="Horizontal" selected={false} state="Default" text="Icon before" showIconBefore iconBefore="search" />
      <Tab layout="Horizontal" selected={false} state="Default" text="Icon after" showIconAfter iconAfter="arrowRight" />
      <Tab layout="Horizontal" selected={false} state="Default" text="Counter" showCounter counter="17" />
    </div>
  ),
};
