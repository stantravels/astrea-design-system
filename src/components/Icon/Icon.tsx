import * as mdiIcons from '@mdi/js';
import { Icon as MdiIcon } from '@mdi/react';

const iconAliases = {
  plus: 'mdiPlus',
  add: 'mdiPlus',
  arrowRight: 'mdiArrowRight',
  arrow_right: 'mdiArrowRight',
  search: 'mdiMagnify',
  magnify: 'mdiMagnify',
  close: 'mdiClose',
  checkCircle: 'mdiCheckCircleOutline',
  check_circle_outline: 'mdiCheckCircleOutline',
} as const;

export type IconName = string;

export interface IconProps {
  name: IconName;
  size?: number;
  title?: string;
}

function toMdiExportName(name: string) {
  if (name.startsWith('mdi')) {
    return name;
  }

  return `mdi${name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')}`;
}

function resolveIconPath(name: string) {
  const directAlias = iconAliases[name as keyof typeof iconAliases];
  const exportName = directAlias ?? toMdiExportName(name);
  const path = mdiIcons[exportName as keyof typeof mdiIcons];

  if (typeof path === 'string') {
    return path;
  }

  return mdiIcons.mdiHelpCircleOutline;
}

export function Icon({ name, size = 18, title }: IconProps) {
  return (
    <span aria-hidden={title ? undefined : true} role={title ? 'img' : 'presentation'}>
      <MdiIcon path={resolveIconPath(name)} size={size / 24} title={title} />
    </span>
  );
}
