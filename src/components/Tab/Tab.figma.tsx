import figma from '@figma/code-connect';
import { Tab } from './Tab';

figma.connect(
  Tab,
  'https://www.figma.com/design/wDBJEZqncu4AoAN0OrL61W/slots-and-tokens?node-id=10129-778&t=MMbW15naMNBxoSts-4',
  {
    example: () => <Tab text="Tab name" />,
  },
);
