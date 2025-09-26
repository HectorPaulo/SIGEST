import { ReactNode } from 'react';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: string;
  }>;
  extras?: ReactNode;
}
