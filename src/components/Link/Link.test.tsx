import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('maps selected only to Menu link state', () => {
    expect(renderToStaticMarkup(<Link selected text="Text" />)).toContain('data-state="Default"');
    expect(renderToStaticMarkup(<Link selected text="Menu" type="Menu link" />)).toContain('data-state="Selected"');
  });

  it('keeps disabled state above selected', () => {
    const markup = renderToStaticMarkup(
      <Link selected state="Disabled" text="Menu" type="Menu link" />,
    );

    expect(markup).toContain('data-state="Disabled"');
    expect(markup).not.toContain('href=');
  });
});
