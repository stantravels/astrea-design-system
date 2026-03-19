import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { componentTokens, primitiveTokens, semanticTokens } from '../tokens';
import { collectTokenReferences, isTokenReference, type TokenCollection, type TokenReference } from '../tokens/helpers';
import { breakpoints, grid, typography } from './index';

type ColorTokenReference = TokenReference & { value: string };

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section style={{ display: 'grid', gap: '12px' }}>
      <div style={{ display: 'grid', gap: '4px' }}>
        <h2 style={{ margin: 0, font: 'var(--astrea-type-heading-lg)' }}>{title}</h2>
        {description ? (
          <p style={{ margin: 0, color: 'var(--astrea-text-secondary)', font: 'var(--astrea-type-body-sm)' }}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function TokenTable({
  tokens,
}: {
  tokens: Array<TokenReference>;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--astrea-border-grey-weak)',
        background: 'var(--astrea-surface-base)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--astrea-type-body-sm)' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left' }}>Token</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Value</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Alias</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} style={{ borderTop: '1px solid var(--astrea-border-grey-weak)' }}>
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
  );
}

function ColorTable({
  tokens,
}: {
  tokens: Array<ColorTokenReference>;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--astrea-border-grey-weak)',
        background: 'var(--astrea-surface-base)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--astrea-type-body-sm)' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left' }}>Preview</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Token</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Value</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Alias</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} style={{ borderTop: '1px solid var(--astrea-border-grey-weak)' }}>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    border: '1px solid var(--astrea-border-grey-weak)',
                    background: token.value,
                  }}
                />
              </td>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>{token.name}</td>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>{token.value}</td>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>
                {token.alias?.targetName ?? 'Primitive value'}
                {token.alias?.targetSetName ? ` (${token.alias.targetSetName})` : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getCollectionTokens(collection: TokenCollection) {
  return collectTokenReferences(collection);
}

function getCollectionChildren(collection: TokenCollection) {
  return Object.entries(collection).filter(([, value]) => !isTokenReference(value)) as Array<
    [string, TokenCollection]
  >;
}

const meta = {
  title: 'Foundations/Overview',
  tags: ['autodocs'],
  render: () => {
    const primitiveColorGroups = getCollectionChildren(primitiveTokens.colors);
    const semanticColorGroups = getCollectionChildren(semanticTokens.colors);
    const primitiveSizingTokens = getCollectionTokens(primitiveTokens.sizing);
    const semanticSizingTokens = getCollectionTokens(semanticTokens.sizing);
    const typographyGroups = getCollectionChildren(primitiveTokens.typography);

    return (
      <div style={{ display: 'grid', gap: '32px', width: 'min(1120px, 100%)' }}>
        <Section
          title="Token hierarchy"
          description="Current foundations focus on the exported Figma token layers: primitive, semantic, and component."
        >
          <TokenTable
            tokens={[
              {
                name: 'Hierarchy/primitive',
                type: 'description',
                value: 'Base values',
                alias: { targetName: 'Primitive / Colors + Primitive / Sizing + Desktop' },
              },
              {
                name: 'Hierarchy/semantic',
                type: 'description',
                value: 'Meaningful aliases',
                alias: { targetName: 'Semantic / Colors + Semantic / Sizing' },
              },
              {
                name: 'Hierarchy/component',
                type: 'description',
                value: 'Component-specific mapping',
                alias: { targetName: 'Component / Tab' },
              },
            ]}
          />
        </Section>

        <Section title="Primitive colors" description="All primitive color tokens exported from Figma.">
          <div style={{ display: 'grid', gap: '24px' }}>
            {primitiveColorGroups.map(([groupName, groupTokens]) => (
              <div key={groupName} style={{ display: 'grid', gap: '8px' }}>
                <h3 style={{ margin: 0, font: 'var(--astrea-type-label-md)' }}>{groupName}</h3>
                <ColorTable
                  tokens={getCollectionTokens(groupTokens).map((token) => ({
                    ...token,
                    value: String(token.value),
                  }))}
                />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Semantic colors" description="All semantic color aliases exported from Figma, including links back to primitive sources.">
          <div style={{ display: 'grid', gap: '24px' }}>
            {semanticColorGroups.map(([groupName, groupTokens]) => (
              <div key={groupName} style={{ display: 'grid', gap: '8px' }}>
                <h3 style={{ margin: 0, font: 'var(--astrea-type-label-md)' }}>{groupName}</h3>
                <ColorTable
                  tokens={getCollectionTokens(groupTokens).map((token) => ({
                    ...token,
                    value: String(token.value),
                  }))}
                />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Primitive sizing" description="All primitive spacing, radius, border, and scale values exported from Figma.">
          <TokenTable tokens={primitiveSizingTokens} />
        </Section>

        <Section title="Semantic sizing" description="All semantic sizing aliases exported from Figma.">
          <TokenTable tokens={semanticSizingTokens} />
        </Section>

        <Section title="Tab component tokens" description="Component-level token mapping currently implemented in code.">
          <TokenTable tokens={Object.values(componentTokens.tab)} />
        </Section>

        <Section title="Typography" description="All typography tokens from the Figma desktop collection.">
          <div style={{ display: 'grid', gap: '24px' }}>
            {typographyGroups.map(([groupName, groupTokens]) => (
              <div key={groupName} style={{ display: 'grid', gap: '8px' }}>
                <h3 style={{ margin: 0, font: 'var(--astrea-type-label-md)' }}>{groupName}</h3>
                <TokenTable tokens={getCollectionTokens(groupTokens)} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Layout" description="Project breakpoints, grid settings, and named typography aliases exposed for implementation.">
          <pre
            style={{
              margin: 0,
              padding: '16px',
              border: '1px solid var(--astrea-border-grey-weak)',
              background: 'var(--astrea-surface-base)',
              font: '0.8125rem/1.5 var(--astrea-font-family-mono)',
            }}
          >
            {JSON.stringify({ breakpoints, grid, typography }, null, 2)}
          </pre>
        </Section>
      </div>
    );
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
