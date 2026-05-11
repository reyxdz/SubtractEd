export interface NavigationItem {
  label: string;
  path: string;
}

export const MAIN_NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Guide', path: '/guide' },
  { label: 'Activities', path: '/activity' },
  { label: 'Assessments', path: '/assessment' },
  { label: 'Enrichment', path: '/enrichment' },
  { label: 'About', path: '/about' },
];
