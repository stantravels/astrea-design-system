import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { primitiveTokens, semanticTokens } from '../tokens';
import { collectTokenReferences, isTokenReference, type TokenCollection, type TokenReference } from '../tokens/helpers';

type ColorTokenReference = TokenReference & { value: string };

type HierarchyRow = {
  level: string;
  description: string;
};

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
  valueLabel = 'Value',
  aliasLabel = 'Alias',
  showAlias = true,
  formatAlias = (token: TokenReference) => token.alias?.targetName ?? 'Primitive value',
}: {
  tokens: Array<TokenReference>;
  valueLabel?: string;
  aliasLabel?: string;
  showAlias?: boolean;
  formatAlias?: (token: TokenReference) => string;
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
            <th style={{ padding: '12px', textAlign: 'left' }}>{valueLabel}</th>
            {showAlias ? <th style={{ padding: '12px', textAlign: 'left' }}>{aliasLabel}</th> : null}
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} style={{ borderTop: '1px solid var(--astrea-border-grey-weak)' }}>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>{token.name}</td>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>{String(token.value)}</td>
              {showAlias ? <td style={{ padding: '12px', verticalAlign: 'top' }}>{formatAlias(token)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HierarchyTable({ rows }: { rows: Array<HierarchyRow> }) {
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
            <th style={{ padding: '12px', textAlign: 'left' }}>Level</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.level} style={{ borderTop: '1px solid var(--astrea-border-grey-weak)' }}>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>{row.level}</td>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ColorTable({
  tokens,
  aliasLabel = 'Alias',
  showAlias = true,
  formatAlias = (token: ColorTokenReference) => token.alias?.targetName ?? 'Primitive value',
}: {
  tokens: Array<ColorTokenReference>;
  aliasLabel?: string;
  showAlias?: boolean;
  formatAlias?: (token: ColorTokenReference) => string;
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
            {showAlias ? <th style={{ padding: '12px', textAlign: 'left' }}>{aliasLabel}</th> : null}
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
              {showAlias ? <td style={{ padding: '12px', verticalAlign: 'top' }}>{formatAlias(token)}</td> : null}
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
          <HierarchyTable
            rows={[
              {
                level: 'Primitive',
                description: 'Base values exported from Figma primitive collections.',
              },
              {
                level: 'Semantic',
                description: 'Meaningful aliases that map primitive values to design intent.',
              },
              {
                level: 'Component',
                description: 'Component-specific tokens that map semantic values to implementation.',
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
                  showAlias={false}
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
                  aliasLabel="Primitive alias"
                  formatAlias={(token) => token.alias?.targetName ?? 'Primitive value'}
                />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Primitive sizing" description="All primitive spacing, radius, border, and scale values exported from Figma.">
          <TokenTable tokens={primitiveSizingTokens} showAlias={false} />
        </Section>

        <Section title="Semantic sizing" description="All semantic sizing aliases exported from Figma.">
          <TokenTable
            tokens={semanticSizingTokens}
            aliasLabel="Primitive alias"
            formatAlias={(token) => token.alias?.targetName ?? 'Primitive value'}
          />
        </Section>

        <Section title="Typography" description="All typography tokens from the Figma desktop collection.">
          <div style={{ display: 'grid', gap: '24px' }}>
            {typographyGroups.map(([groupName, groupTokens]) => (
              <div key={groupName} style={{ display: 'grid', gap: '8px' }}>
                <h3 style={{ margin: 0, font: 'var(--astrea-type-label-md)' }}>{groupName}</h3>
                <TokenTable tokens={getCollectionTokens(groupTokens)} showAlias={false} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
