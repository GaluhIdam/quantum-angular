import { Color, Icon, Size } from '@quantum/fui';

export interface BtnUtilDTO {
  id: string | number;
  option: 'iconText' | 'icon' | 'text';
  color: Color;
  text: string;
  icon: Icon;
  size: 's' | 'm' | 'l';
  iconSide: 'right' | 'left';
  disabled: boolean;
  style: 'secondary' | 'filled';
  margin?: string;
}

export interface BadgeUtilDTO {
  text: string;
  color: Color;
  size: Size;
  sizeIcon: Size;
  isBadgeIcon: boolean;
  iconPosition: 'start' | 'end';
  icon: Icon;
  underline: boolean;
  rounded: boolean;
  margin?: string;
}
