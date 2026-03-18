import { Icon as MdiIcon } from '@mdi/react';
import {
  mdiArrowRight,
  mdiCheckCircleOutline,
  mdiClose,
  mdiMagnify,
  mdiPlus,
} from '@mdi/js';

const iconPaths = {
  plus: mdiPlus,
  arrowRight: mdiArrowRight,
  search: mdiMagnify,
  close: mdiClose,
  checkCircle: mdiCheckCircleOutline,
} as const;

export type IconName = keyof typeof iconPaths;

export interface IconProps {
  name: IconName;
  size?: number;
  title?: string;
}

export function Icon({ name, size = 18, title }: IconProps) {
  return (
    <span aria-hidden={title ? undefined : true} role={title ? 'img' : 'presentation'}>
      <MdiIcon path={iconPaths[name]} size={size / 24} title={title} />
    </span>
  );
}
