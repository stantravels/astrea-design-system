import figma from '@figma/code-connect';
import { TabNavigation, type TabsItem } from './Tabs';

const verticalItems: TabsItem[] = [
  {
    value: 'overview',
    label: 'Overview',
    iconBefore: 'search',
  },
  {
    value: 'tokens',
    label: 'Tokens',
    counter: '17',
  },
  {
    value: 'patterns',
    label: 'Patterns',
    iconAfter: 'arrowRight',
  },
  {
    value: 'guidelines',
    label: 'Guidelines',
  },
  {
    value: 'release-notes',
    label: 'Release Notes',
  },
];

figma.connect(
  TabNavigation,
  'https://www.figma.com/design/2xS0QG1Xzg8rGGrENI9BHN/Astrea-Design-System-v2?m=auto&node-id=2123-10100&t=EquaG5YM9kSxEizz-1',
  {
    props: {
      selected: figma.enum('Selected', {
        '1': 'overview',
        '2': 'tokens',
        '3': 'patterns',
        '4': 'guidelines',
        '5': 'release-notes',
      }),
    },
    example: ({ selected }) => (
      <TabNavigation
        ariaLabel="Vertical tab navigation"
        fullWidth
        items={verticalItems}
        orientation="vertical"
        showPanel={false}
        value={selected}
      />
    ),
  },
);
