import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Controls, Heading, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { Counter } from './Counter';

const meta = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  args: {
    value: '1',
    active: false,
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
            Compact status badge reused by Tab and Link for lightweight counts and notifications.
          </Subtitle>
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
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Counter value="1" />
      <Counter active value="1" />
      <Counter active value="128" />
      <Counter active value="" />
    </div>
  ),
};
