import { HorizontalTabNavigation } from './components';
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
  return (
    <main className="playground-shell">
      <section className="playground-hero">
        <span className="playground-eyebrow">Astrea Design System</span>
        <h1>Tab Navigation aligned with Figma tokens and Storybook docs.</h1>
        <p>
          The current local app stays intentionally focused on the active scope: foundations,
          the base Tab building block, and horizontal navigation composed from it.
        </p>
        <HorizontalTabNavigation ariaLabel="Project overview" defaultSelected="tab-1" items={tabItems} />
      </section>
    </main>
  );
}

export default App;
