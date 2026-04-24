import figma from '@figma/code-connect';
import { VerticalTabNavigation, type TabNavigationItem } from './Tabs';

const verticalItems: TabNavigationItem[] = [
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
  VerticalTabNavigation,
  'https://www.figma.com/design/wDBJEZqncu4AoAN0OrL61W/slots-and-tokens?node-id=209-4714&t=MMbW15naMNBxoSts-4',
  {
    example: () => (
      <VerticalTabNavigation
        ariaLabel="Content tabs"
        defaultSelected="tab-1"
        items={verticalItems}
      />
    ),
  },
);
