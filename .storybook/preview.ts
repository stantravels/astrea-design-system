import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.scss';

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
        { name: 'Canvas', value: 'var(--sem-surface-grey-xweak)' },
        { name: 'Base', value: 'var(--sem-surface-base)' },
        { name: 'Brand Weak', value: 'var(--sem-surface-brand-xxweak)' },
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
