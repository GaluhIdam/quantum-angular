import {
  BadgeUtilDTO,
  BtnUtilDTO,
} from '../../../../shared/table-utility-simple/dto/table-utility.dto';

export const rightBeforeBtnUtil: BtnUtilDTO[] = [
  {
    id: 'filter',
    option: 'iconText',
    color: 'text',
    text: 'Filter',
    icon: 'filter',
    size: 'm',
    iconSide: 'left',
    disabled: false,
    style: 'secondary',
    margin: '0 10px 0 0'
  },
  {
    id: 'add',
    option: 'icon',
    color: 'primary',
    text: 'Add',
    icon: 'plusInCircle',
    size: 'm',
    iconSide: 'left',
    disabled: false,
    style: 'filled',
  },
];

export const leftBeforeUtilBtn: BtnUtilDTO[] = [
  {
    id: 'prev',
    option: 'icon',
    color: 'text',
    text: '',
    icon: 'arrowLeft',
    size: 'm',
    iconSide: 'left',
    disabled: false,
    style: 'secondary',
  },
];

export const leftAfterUtilBtn: BtnUtilDTO[] = [
  {
    id: 'next',
    option: 'icon',
    color: 'text',
    text: '',
    icon: 'arrowRight',
    size: 'm',
    iconSide: 'left',
    disabled: false,
    style: 'secondary',
    margin: '0 0 0 0'
  },
];

export const leftAfterUtilBadge: BadgeUtilDTO[] = [
  {
    text: '0h 0m',
    color: 'ghost',
    size: 'sizem',
    sizeIcon: 'sizes',
    isBadgeIcon: true,
    iconPosition: 'start',
    icon: 'clock',
    underline: false,
    rounded: false,
  }
];
