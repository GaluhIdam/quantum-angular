import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  FilterGroupButtonComponent,
  FilterGroupComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TooltipComponent,
} from '@quantum/fui';
import {
  BadgeComponent,
  Color,
  HorizontalStackComponent,
  IconsComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    BadgeComponent,
    IconsComponent,
    HorizontalStackComponent,
    ButtonIconComponent,
    TooltipComponent,
    FilterGroupComponent,
    FilterGroupButtonComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyDataComponent,
    TableBodyRowComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  /** Estimated Fee Variable */
  estimatedFee: {
    percentage: number;
    color: Color | string;
  }[] = [
    {
      percentage: 70,
      color: 'primary',
    },
    {
      percentage: 30,
      color: 'disabled',
    },
    {
      percentage: 0,
      color: 'warning',
    },
  ];

  /** Legal Fee Variable */
  legalFee: {
    percentage: number;
    color: Color | string;
  }[] = [
    {
      percentage: 70,
      color: 'primary',
    },
    {
      percentage: 30,
      color: 'disabled',
    },
  ];

  /** Total Timesheet Variable */
  totalTimesheet: {
    percentage: number;
    color: Color | string;
  }[] = [
    {
      percentage: 70,
      color: 'primary',
    },
    {
      percentage: 25,
      color: 'disabled',
    },
    {
      percentage: 5,
      color: '#E7664C',
    },
  ];

  /** Total Expenses Variable */
  totalExpenses: {
    percentage: number;
    color: Color | string;
  }[] = [
    {
      percentage: 70,
      color: 'primary',
    },
    {
      percentage: 25,
      color: 'disabled',
    },
    {
      percentage: 5,
      color: '#E7664C',
    },
  ];

  /** Total Expenses Variable */
  remainingDeposit: {
    percentage: number;
    color: Color | string;
  }[] = [
    {
      percentage: 50,
      color: '#E7664C',
    },
    {
      percentage: 50,
      color: 'disabled',
    },
  ];
  /** Collection Ratio Variable */
  collectionRatio: {
    percentage: number;
    color: Color | string;
  }[] = [
    {
      percentage: 80,
      color: 'primary',
    },
    {
      percentage: 20,
      color: 'disabled',
    },
  ];

  onlyNonMemberBtn: boolean = true;

  titleTable: string[] = ['Name', 'Duration'];
  dataTable: { name: string; duration: string }[] = [
    {
      name: 'Jacob Jones (JJ)',
      duration: '2h 30m',
    },
    {
      name: 'Esther Howard (EH)',
      duration: '2h 30m',
    },
    {
      name: 'Cody Fisher (CF)',
      duration: '2h 30m',
    },
    {
      name: 'Jane Cooper (JC)',
      duration: '2h 30m',
    },
    {
      name: 'Courtney Henry (CH)',
      duration: '2h 30m',
    },
  ];
}
