export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  isPermission: boolean;
  children?: NavItem[];
}
