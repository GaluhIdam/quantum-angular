import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  CalloutComponent,
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
    CalloutComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  type: {
    billability: 'Billable' | 'Potential Matter' | 'Probono' | 'Non Billable';
    pricingType?: 'Lumpsum' | 'Retainer' | 'Hourly' | 'Cap';
    status: 'On Hold' | 'Active';
  } = {
    billability: 'Potential Matter',
    // pricingType: 'Hourly',
    status: 'Active',
  };

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

  /** Free  Limit Variable */
  freeLimit: {
    percentage: number;
    color: Color | string;
  }[] = [
    {
      percentage: 70,
      color: '#E7664C',
    },
    {
      percentage: 30,
      color: 'disabled',
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

  memberFilterBtn: 'all' | 'matter-members' | 'non-members' = 'all';

  titleTable: string[] = ['Name', 'Total Time Spent'];
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

  /** Toggle filter member */
  toggleFilterMember(param: 'all' | 'matter-members' | 'non-members'): void {
    this.memberFilterBtn = param;
  }
}
