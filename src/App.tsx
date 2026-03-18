import { useState } from 'react';
import { Button, Input, Tabs } from './components';
import './styles/index.css';

const tabItems = [
  {
    value: 'overview',
    label: 'Overview',
    content:
      'Foundation-first component architecture with primitive, semantic, and component tokens.',
  },
  {
    value: 'storybook',
    label: 'Storybook',
    content:
      'Stories are colocated with components and tuned for controls, accessibility review, and future designer handoff.',
  },
  {
    value: 'code-connect',
    label: 'Code Connect',
    content:
      'The repository includes Figma Code Connect configuration so mappings can be published as soon as component node URLs are confirmed.',
  },
] as const;

function App() {
  const [email, setEmail] = useState('');

  return (
    <main className="playground-shell">
      <section className="playground-hero">
        <span className="playground-eyebrow">Astrea Design System</span>
        <h1>React foundation for a scalable multi-brand design system.</h1>
        <p>
          This starter project is structured around tokens, foundations, Storybook, and
          component-level implementation patterns that can scale across the broader Figma
          library.
        </p>
        <div className="playground-actions">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="ghost">Ghost action</Button>
        </div>
      </section>

      <section className="playground-grid">
        <div className="playground-card">
          <h2>Input pattern</h2>
          <Input
            label="Email"
            placeholder="name@astrea.design"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            description="Example field styling for labels, support text, and validation."
          />
        </div>

        <div className="playground-card">
          <h2>Tabs pattern</h2>
          <Tabs items={tabItems} ariaLabel="Project overview" />
        </div>
      </section>
    </main>
  );
}

export default App;
