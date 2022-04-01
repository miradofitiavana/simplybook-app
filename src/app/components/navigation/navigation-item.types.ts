export interface NavigationItem {
  id?: string;
  title?: string;
  subtitle?: string;
  type:
    | 'basic'
    | 'collapsable'
    | 'group';
  // hidden?: (item: NavigationItem) => boolean;
  hidden?: boolean;
  active?: boolean;
  disabled?: boolean;
  link?: string;
  by_society: boolean;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  tooltip?: string;
  children?: NavigationItem[];
}
