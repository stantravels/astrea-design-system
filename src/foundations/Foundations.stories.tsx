import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentTokens, primitiveTokens, semanticTokens } from '../tokens';
import { breakpoints, grid, typography } from './index';

function SwatchGrid({
  entries,
}: {
  entries: Array<{ name: string; value: string }>;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
      }}
    >
      {entries.map((entry) => (
        <div
          key={entry.name}
          style={{
            border: '1px solid var(--ast-color-border-subtle)',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'white',
          }}
        >
          <div style={{ height: '88px', background: entry.value }} />
          <div style={{ padding: '12px' }}>
            <div style={{ font: 'var(--ast-type-label-md)' }}>{entry.name}</div>
            <div style={{ color: 'var(--ast-color-text-secondary)', font: 'var(--ast-type-body-sm)' }}>
              {entry.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Overview',
  tags: ['autodocs'],
  render: () => {
    const primitiveColorEntries = Object.entries(primitiveTokens.color).map(([name, value]) => ({
      name,
      value,
    }));

    const semanticSurfaceEntries = Object.entries(semanticTokens.color.surface).map(([name, value]) => ({
      name,
      value,
    }));

    return (
      <div style={{ display: 'grid', gap: '32px', width: 'min(1080px, 100%)' }}>
        <section style={{ display: 'grid', gap: '12px' }}>
          <h2 style={{ margin: 0 }}>Token hierarchy</h2>
          <p style={{ margin: 0 }}>
            The starter follows a three-level token model: primitive values feed semantic
            aliases, and component tokens map those semantics into implementation-friendly
            slots.
          </p>
        </section>

        <section style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ margin: 0 }}>Primitive colors</h3>
          <SwatchGrid entries={primitiveColorEntries} />
        </section>

        <section style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ margin: 0 }}>Semantic surfaces</h3>
          <SwatchGrid entries={semanticSurfaceEntries} />
        </section>

        <section style={{ display: 'grid', gap: '12px' }}>
          <h3 style={{ margin: 0 }}>Breakpoints and grid</h3>
          <pre
            style={{
              margin: 0,
              padding: '16px',
              borderRadius: '16px',
              background: 'var(--ast-color-surface-elevated)',
              border: '1px solid var(--ast-color-border-subtle)',
              font: '0.8125rem/1.5 var(--ast-font-family-mono)',
            }}
          >
            {JSON.stringify({ breakpoints, grid, typography, componentTokens }, null, 2)}
          </pre>
        </section>
      </div>
    );
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
