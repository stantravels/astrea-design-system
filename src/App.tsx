import { useState } from 'react';
import { Counter, HorizontalTabNavigation, Link } from './components';
import './styles/index.scss';

const tabItems = [
  {
    value: 'tab-1',
    text: 'Tab name',
  },
  {
    value: 'tab-2',
    text: 'Tab name',
  },
  {
    value: 'tab-3',
    text: 'Tab name',
  },
] as const;

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <main className="playground-shell astrea-theme" data-theme={theme}>
      <section className="playground-hero">
        <div className="playground-toolbar">
          <span className="playground-eyebrow">Astrea Design System</span>
          <button
            aria-pressed={theme === 'dark'}
            className="playground-theme-toggle"
            type="button"
            onClick={() => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
        <h1>Design system components aligned with Figma tokens and runtime themes.</h1>
        <p>
          The local playground exercises the current token chain across tabs, counters, and
          links in both light and dark mode.
        </p>
        <div className="playground-stack">
          <HorizontalTabNavigation ariaLabel="Project overview" defaultSelected="tab-1" items={tabItems} />
          <div className="playground-row">
            <Counter value="2" />
            <Counter active value="128" />
            <Counter active value="" />
          </div>
          <div className="playground-row">
            <Link text="Regular link" />
            <Link text="Subtle link" type="Subtle link" />
            <Link selected text="Menu link" type="Menu link" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
