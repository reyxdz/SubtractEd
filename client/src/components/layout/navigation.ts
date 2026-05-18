import type { NavigationUnlockState } from '../../utils/learningProgress';

export interface NavigationItem {
  label: string;
  path: string;
  unlockKey: keyof NavigationUnlockState;
}

export const MAIN_NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', path: '/', unlockKey: 'home' },
  { label: 'Guide', path: '/guide', unlockKey: 'guide' },
  { label: 'Activities', path: '/activity', unlockKey: 'activities' },
  { label: 'Assessments', path: '/assessment', unlockKey: 'assessments' },
  { label: 'Enrichment', path: '/enrichment', unlockKey: 'enrichment' },
  { label: 'About', path: '/about', unlockKey: 'about' },
];
