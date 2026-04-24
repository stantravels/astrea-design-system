import React from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/index.scss';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Astrea color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? 'dark' : 'light';

      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = theme;
      }

      return React.createElement(
        'div',
        {
          className: 'astrea-theme',
          'data-theme': theme,
          style: {
            minHeight: '100vh',
            minWidth: '100%',
            padding: '24px',
            background: 'var(--sem-surface-grey-xweak)',
            color: 'var(--sem-text-primary)',
          },
        },
        React.createElement(Story),
      );
    },
  ],
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
