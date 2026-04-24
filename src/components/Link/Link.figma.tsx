import figma from '@figma/code-connect';
import { Link } from './Link';

figma.connect(
  Link,
  'https://www.figma.com/design/wDBJEZqncu4AoAN0OrL61W/slots-and-tokens?node-id=10183-27241&t=MMbW15naMNBxoSts-4',
  {
    example: () => <Link text="Link" type="Text link" />,
  },
);

figma.connect(
  Link,
  'https://www.figma.com/design/wDBJEZqncu4AoAN0OrL61W/slots-and-tokens?node-id=10183-27242&t=MMbW15naMNBxoSts-4',
  {
    example: () => <Link text="Subtle link" type="Subtle link" />,
  },
);

figma.connect(
  Link,
  'https://www.figma.com/design/wDBJEZqncu4AoAN0OrL61W/slots-and-tokens?node-id=10183-27249&t=MMbW15naMNBxoSts-4',
  {
    example: () => <Link text="Menu link" type="Menu link" />,
  },
);
