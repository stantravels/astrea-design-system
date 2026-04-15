import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Canvas, Controls, Heading, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { recommendedIconNames } from '../Icon/iconNames';
import { Link } from './Link';

const purpose = [
  'To facilitate navigation within or outside an application, connecting users to relevant content or resources.',
  'To provide a clear and accessible way to trigger actions or access information through clickable text.',
  'To enhance usability with consistent styling, visual feedback, and accessibility features.',
] as const;

const whenToUse = [
  'Navigation: Use for directing users to related content, such as in text blocks, footers, or menus for navigating to other pages (e.g., “Privacy Policy” or “Contact Us”).',
  'External Resources: Use to link to external websites, documents, or social media profiles, often with an icon to indicate off-site navigation (e.g., “Visit our blog”).',
  'Inline Content: Use within paragraphs or lists to reference additional information, such as citations, related articles, or “Learn More” links.',
  'Action Triggers: Use for secondary actions that involve navigation, such as redirecting to a signup page or initiating a download.',
] as const;

const whenNotToUse = [
  'Primary Form Actions: Avoid using for primary form submissions (e.g., “Submit” or “Save”); use a Button component instead.',
  'Non-Interactive Elements: Do not use for non-clickable text or decorative elements; use plain text or a badge instead.',
  'High-Prominence Actions: Avoid using for critical or primary actions requiring visual emphasis; use a Button component for greater visibility.',
] as const;

const accessibility = [
  'Labeling: Provide clear, descriptive text or `aria-label` for each link (e.g., “Go to homepage”). For icon-only links, use `aria-label` to describe the action (e.g., “Download file”).',
  'Keyboard Navigation: Ensure links are focusable and activatable via keyboard (e.g., `Enter`), with visible focus indicators (e.g., outline or underline).',
  'Contrast Ratios: Maintain sufficient contrast (minimum `4.5:1` for text, `3:1` for non-text elements like icons) for link text, icons, and backgrounds in all states (default, hover, visited).',
  'Role and State: Use semantic `<a>` elements with appropriate attributes, such as `aria-current="page"` for current page links.',
  'Touch Targets: Ensure links have a large enough touch target (minimum `44x44` pixels) for accessibility on touch devices.',
  'External Link Indication: For external links, indicate off-site navigation (e.g., via icon or `aria-label="Opens in new tab"`) and use `target="_blank"` with `rel="noopener"` for security.',
] as const;

const bestPractices = [
  'Clear Text: Use concise, action-oriented text that describes the link’s destination or purpose (e.g., “Read the guide” instead of “Click here”).',
  'Consistent Styling: Align link appearance (color, underline, font) with the design system, ensuring distinct styles for default, hover, active, and visited states.',
  'Visual Feedback: Provide clear visual cues for interactivity, such as underlines, color changes on hover, or icon animations.',
  'Contextual Clarity: Ensure links are distinguishable from surrounding text (e.g., via color or underline) and avoid ambiguous phrasing that requires context to understand.',
  'Responsive Design: Ensure links are touch-friendly and adapt to screen sizes, maintaining legibility and accessibility on mobile devices.',
  'Avoid Overuse: Limit the number of links in dense content to prevent overwhelming users; prioritize the most relevant actions or destinations.',
] as const;

function DocsList({ items }: { items: readonly string[] }) {
  return (
    <ul style={{ margin: '0 0 24px', paddingLeft: '20px', lineHeight: 1.6 }}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: '8px' }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function StyleGroup({
  title,
  inverseBackground = false,
  children,
}: {
  title: string;
  inverseBackground?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gap: '12px',
        padding: '16px',
        background: inverseBackground ? 'var(--sem-surface-brand-xxxstrong)' : 'var(--sem-surface-base)',
      }}
    >
      <strong style={{ color: inverseBackground ? 'var(--sem-text-inverse)' : 'inherit' }}>{title}</strong>
      {children}
    </div>
  );
}

function TwoUp({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '16px',
        width: 'min(920px, 100%)',
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    type: 'Text link',
    style: 'Regular',
    state: 'Default',
    text: 'Link',
    showIconBefore: false,
    iconBefore: 'information',
    showIconAfter: false,
    iconAfter: 'arrow_right',
    showText: true,
    showCounter: false,
    counter: '2',
    selected: false,
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Pressed', 'Focused', 'Disabled', 'Visited'],
    },
    selected: {
      control: 'boolean',
      if: { arg: 'type', eq: 'Menu link' },
      description: 'Available only for `Menu link`; maps to the Figma selected state.',
    },
    text: {
      control: 'text',
    },
    iconBefore: {
      control: 'text',
      description: `Material Design Icons name. Recommended examples: ${recommendedIconNames.join(', ')}.`,
    },
    iconAfter: {
      control: 'text',
      description: `Material Design Icons name. Recommended examples: ${recommendedIconNames.join(', ')}.`,
    },
  },
  parameters: {
    a11y: {
      test: 'error',
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle>
            Documentation synced from the Link component docs in Figma for the Astrea Design System v2 branch.
          </Subtitle>
          <Heading>Purpose</Heading>
          <DocsList items={purpose} />
          <Heading>When to Use</Heading>
          <DocsList items={whenToUse} />
          <Heading>When Not to Use</Heading>
          <DocsList items={whenNotToUse} />
          <Heading>Accessibility</Heading>
          <DocsList items={accessibility} />
          <Heading>Best Practices</Heading>
          <DocsList items={bestPractices} />
          <Heading>Playground</Heading>
          <Canvas of={Playground} />
          <Heading>Link</Heading>
          <Canvas of={LinkStory} />
          <Heading>Subtle Link</Heading>
          <Canvas of={SubtleLinkStory} />
          <Heading>Menu Link</Heading>
          <Canvas of={MenuLinkStory} />
          <Heading>API</Heading>
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Link {...args} />,
};

export const LinkStory: Story = {
  name: 'Link',
  render: () => (
    <TwoUp>
      <StyleGroup title="Regular">
        <Link type="Text link" style="Regular" state="Default" text="Default" />
        <Link type="Text link" style="Regular" state="Hover" text="Hover" />
        <Link type="Text link" style="Regular" state="Pressed" text="Pressed" />
        <Link type="Text link" style="Regular" state="Focused" text="Focused" />
        <Link type="Text link" style="Regular" state="Visited" text="Visited" />
        <Link type="Text link" style="Regular" state="Disabled" text="Disabled" />
      </StyleGroup>
      <StyleGroup inverseBackground title="Inverse">
        <Link type="Text link" style="Inverse" state="Default" text="Default" />
        <Link type="Text link" style="Inverse" state="Hover" text="Hover" />
        <Link type="Text link" style="Inverse" state="Pressed" text="Pressed" />
        <Link type="Text link" style="Inverse" state="Focused" text="Focused" />
        <Link type="Text link" style="Inverse" state="Visited" text="Visited" />
        <Link type="Text link" style="Inverse" state="Disabled" text="Disabled" />
      </StyleGroup>
    </TwoUp>
  ),
};

export const SubtleLinkStory: Story = {
  name: 'Subtle Link',
  render: () => (
    <TwoUp>
      <StyleGroup title="Regular">
        <Link type="Subtle link" style="Regular" state="Default" text="Default" />
        <Link type="Subtle link" style="Regular" state="Hover" text="Hover" />
        <Link type="Subtle link" style="Regular" state="Pressed" text="Pressed" />
        <Link type="Subtle link" style="Regular" state="Focused" text="Focused" />
        <Link type="Subtle link" style="Regular" state="Visited" text="Visited" />
        <Link type="Subtle link" style="Regular" state="Disabled" text="Disabled" />
      </StyleGroup>
      <StyleGroup inverseBackground title="Inverse">
        <Link type="Subtle link" style="Inverse" state="Default" text="Default" />
        <Link type="Subtle link" style="Inverse" state="Hover" text="Hover" />
        <Link type="Subtle link" style="Inverse" state="Pressed" text="Pressed" />
        <Link type="Subtle link" style="Inverse" state="Focused" text="Focused" />
        <Link type="Subtle link" style="Inverse" state="Visited" text="Visited" />
        <Link type="Subtle link" style="Inverse" state="Disabled" text="Disabled" />
      </StyleGroup>
    </TwoUp>
  ),
};

export const MenuLinkStory: Story = {
  name: 'Menu Link',
  render: () => (
    <TwoUp>
      <StyleGroup title="Regular">
        <Link type="Menu link" style="Regular" state="Default" text="Default" />
        <Link type="Menu link" style="Regular" state="Hover" text="Hover" />
        <Link type="Menu link" style="Regular" state="Pressed" text="Pressed" />
        <Link type="Menu link" style="Regular" state="Focused" text="Focused" />
        <Link type="Menu link" style="Regular" state="Default" selected text="Selected" />
        <Link type="Menu link" style="Regular" state="Disabled" text="Disabled" />
      </StyleGroup>
      <StyleGroup inverseBackground title="Inverse">
        <Link type="Menu link" style="Inverse" state="Default" text="Default" />
        <Link type="Menu link" style="Inverse" state="Hover" text="Hover" />
        <Link type="Menu link" style="Inverse" state="Pressed" text="Pressed" />
        <Link type="Menu link" style="Inverse" state="Focused" text="Focused" />
        <Link type="Menu link" style="Inverse" state="Default" selected text="Selected" />
        <Link type="Menu link" style="Inverse" state="Disabled" text="Disabled" />
      </StyleGroup>
    </TwoUp>
  ),
};
