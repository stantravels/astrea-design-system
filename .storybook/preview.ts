import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundations', 'Components'],
      },
    },
    backgrounds: {
      default: 'Canvas',
      values: [
        { name: 'Canvas', value: 'var(--ast-color-surface-canvas)' },
        { name: 'Subtle', value: 'var(--ast-color-surface-subtle)' },
        { name: 'Elevated', value: 'var(--ast-color-surface-elevated)' },
      ],
    },
    docs: {
      source: {
        state: 'open',
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
