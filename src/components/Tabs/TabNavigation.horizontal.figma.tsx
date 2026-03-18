import figma from '@figma/code-connect';
import { HorizontalTabNavigation, type TabNavigationItem } from './Tabs';

const horizontalItems: TabNavigationItem[] = [
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
  {
    value: 'tab-4',
    text: 'Tab name',
  },
  {
    value: 'tab-5',
    text: 'Tab name',
  },
];

figma.connect(
  HorizontalTabNavigation,
  'https://www.figma.com/design/2xS0QG1Xzg8rGGrENI9BHN/Astrea-Design-System-v2?m=auto&node-id=2123-10049&t=EquaG5YM9kSxEizz-1',
  {
    props: {
      selected: figma.enum('Selected', {
        '1': 'tab-1',
        '2': 'tab-2',
        '3': 'tab-3',
        '4': 'tab-4',
        '5': 'tab-5',
      }),
    },
    example: ({ selected }) => (
      <HorizontalTabNavigation
        ariaLabel="Horizontal tab navigation"
        defaultSelected="tab-1"
        items={horizontalItems}
        selected={selected}
      />
    ),
  },
);
