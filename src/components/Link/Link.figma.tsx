import figma from '@figma/code-connect';
import { Link } from './Link';

figma.connect(
  Link,
  'https://www.figma.com/design/2xS0QG1Xzg8rGGrENI9BHN/Astrea-Design-System-v2?m=auto&node-id=2221-3454&t=96S4DiSboMTvt4Dn-1',
  {
    example: () => <Link text="Link" />,
  },
);
