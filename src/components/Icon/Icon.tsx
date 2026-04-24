import {
  mdiArrowRight,
  mdiCheckCircleOutline,
  mdiClose,
  mdiHelpCircleOutline,
  mdiInformationOutline,
  mdiMagnify,
  mdiPlus,
} from '@mdi/js';
import { Icon as MdiIcon } from '@mdi/react';

const iconAliases = {
  plus: mdiPlus,
  add: mdiPlus,
  arrowRight: mdiArrowRight,
  arrow_right: mdiArrowRight,
  search: mdiMagnify,
  magnify: mdiMagnify,
  close: mdiClose,
  information: mdiInformationOutline,
  info: mdiInformationOutline,
  checkCircle: mdiCheckCircleOutline,
  check_circle_outline: mdiCheckCircleOutline,
} as const;

export type IconName = keyof typeof iconAliases;

export interface IconProps {
  name: IconName;
  size?: number;
  title?: string;
}

function resolveIconPath(name: string) {
  return iconAliases[name as IconName] ?? mdiHelpCircleOutline;
}

export function Icon({ name, size = 18, title }: IconProps) {
  return (
    <span aria-hidden={title ? undefined : true} role={title ? 'img' : 'presentation'}>
      <MdiIcon path={resolveIconPath(name)} size={size / 24} title={title} />
    </span>
  );
}
