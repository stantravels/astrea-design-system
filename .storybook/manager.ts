import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Astrea Design System',
    brandUrl: 'https://www.figma.com/design/2xS0QG1Xzg8rGGrENI9BHN/Astrea-Design-System-v2',
  }),
});
