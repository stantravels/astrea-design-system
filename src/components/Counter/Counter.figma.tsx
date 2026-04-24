import figma from '@figma/code-connect';
import { Counter } from './Counter';

figma.connect(
  Counter,
  'https://www.figma.com/design/wDBJEZqncu4AoAN0OrL61W/slots-and-tokens?node-id=186-4078&t=MMbW15naMNBxoSts-4',
  {
    example: () => <Counter active value="2" />,
  },
);
