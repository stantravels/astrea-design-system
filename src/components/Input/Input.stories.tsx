import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    description: 'Support text can describe formatting or intent.',
    placeholder: 'name@astrea.design',
    status: 'default',
    inputSize: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ValidationStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '16px', width: '360px' }}>
      <Input {...args} label="Default" />
      <Input
        {...args}
        label="Error"
        status="error"
        message="Please enter a valid email address."
      />
      <Input
        {...args}
        label="Success"
        status="success"
        message="Email looks good."
      />
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    leadingIcon: 'search',
    placeholder: 'Search components',
  },
};
