import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentTokens, primitiveTokens, semanticTokens } from '../tokens';
import { breakpoints, grid, typography } from './index';
import type { TokenReference } from '../tokens/helpers';

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

function TokenTable({
  title,
  tokens,
}: {
  title: string;
  tokens: Array<TokenReference>;
}) {
  return (
    <section style={{ display: 'grid', gap: '12px' }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--ast-color-border-subtle)',
          background: 'var(--ast-color-surface-elevated)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--ast-type-body-sm)' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Token</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Value</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Alias</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.name} style={{ borderTop: '1px solid var(--ast-color-border-subtle)' }}>
                <td style={{ padding: '12px', verticalAlign: 'top' }}>{token.name}</td>
                <td style={{ padding: '12px', verticalAlign: 'top' }}>{String(token.value)}</td>
                <td style={{ padding: '12px', verticalAlign: 'top' }}>
                  {token.alias?.targetName ?? 'Primitive value'}
                  {token.alias?.targetSetName ? ` (${token.alias.targetSetName})` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const meta = {
  title: 'Foundations/Overview',
  tags: ['autodocs'],
  render: () => {
    const primitiveColorEntries = Object.values(primitiveTokens.colors).map((token) => ({
      name: token.name,
      value: String(token.value),
    }));

    const semanticSurfaceEntries = [
      semanticTokens.colors.surfaceBase,
      semanticTokens.colors.surfaceGrey,
      semanticTokens.colors.surfaceGreyStrong,
      semanticTokens.colors.surfaceBrandXWeak,
      semanticTokens.colors.surfaceBrandXXWeak,
    ].map((token) => ({
      name: token.name,
      value: String(token.value),
    }));

    const tabComponentEntries = Object.values(componentTokens.tab);

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

        <TokenTable
          title="Tab component tokens"
          tokens={tabComponentEntries}
        />

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
            {JSON.stringify({ breakpoints, grid, typography }, null, 2)}
          </pre>
        </section>
      </div>
    );
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
