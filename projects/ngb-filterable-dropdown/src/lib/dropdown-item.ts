export interface DropdownItemBadge {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  cssClass?: string;
}

export interface DropdownItem {
  value: string;
  badge?: DropdownItemBadge;
}

export type DropdownItemInput = string | DropdownItem;
