import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HorizontalTabNavigation } from './Tabs';

const items = [
  { value: 'tab-1', text: 'One', panelId: 'panel-1' },
  { value: 'tab-2', text: 'Two', panelId: 'panel-2' },
] as const;

describe('HorizontalTabNavigation', () => {
  it('falls back to the first item when a controlled selected value is missing', () => {
    const markup = renderToStaticMarkup(
      <HorizontalTabNavigation ariaLabel="Example tabs" items={items} selected="missing" />,
    );

    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain('aria-controls="panel-1"');
    expect(markup).not.toContain('id=":R0:-missing"');
  });
});
