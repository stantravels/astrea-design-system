import figma from '@figma/code-connect';
import { Counter } from './Counter';

figma.connect(
  Counter,
  'https://www.figma.com/design/2xS0QG1Xzg8rGGrENI9BHN/Astrea-Design-System-v2?m=auto&node-id=10252-4355&t=96S4DiSboMTvt4Dn-1',
  {
    example: () => <Counter active value="2" />,
  },
);
