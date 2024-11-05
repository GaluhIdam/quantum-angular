import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  CommentListComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  Icon,
  IconsComponent,
  InputFieldComponent,
  Size,
  StepStatus,
  TableDataTreeComponent,
  TableHeadTreeComponent,
  TableRowTreeComponent,
  TableTreeComponent,
  TabsComponent,
  TabsContentComponent,
  TextComponent,
  TimelineComponent,
  TimelineSectionComponent,
  TooltipComponent,
} from '@quantum/fui';
import {
  BillingDTO,
  DetailBillingDTO,
} from '../../../../interfaces/billing.dto';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [
    CommonModule,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    TextComponent,
    BadgeComponent,
    TableTreeComponent,
    TableRowTreeComponent,
    TableHeadTreeComponent,
    TableDataTreeComponent,
    TooltipComponent,
    FlyoutComponent,
    FlyoutHeaderComponent,
    FlyoutBodyComponent,
    FlyoutFooterComponent,
    TabsComponent,
    TabsContentComponent,
    TimelineComponent,
    TimelineSectionComponent,
    CommentListComponent,
  ],
  templateUrl: './billings.component.html',
  styleUrl: './billings.component.scss',
})
export class BillingsComponent {
  /** Flyout Utility */
  isOpenFlyout: boolean = false;
  titleFlyout: string = '1547/2024';
  status:
    | 'Draft'
    | 'Ongoing'
    | 'Offgoing'
    | 'System Client'
    | 'Confirmed'
    | 'Promised'
    | 'Difficult'
    | 'Non-Performing'
    | 'Installment'
    | 'Paid'
    | 'Completion'
    | 'Delete'
    | 'Prebill' = 'Promised';
  periode: string = 'Juni 2024';

  /** Table utility */
  limit: number = 10;
  totalItems: number = 0;
  title: string[] = ['Billing', 'Payer', 'Amount', 'Collection Ratio', ''];

  /** Data Billing */
  dataBilliing: BillingDTO[] = [
    {
      billingNumber: '1547/2024	',
      payer: 'Abby & Wells',
      amount: '47,755,030',
      collecctionRation: '20',
      fic: '(IND) Jacob Jones Jones',
      date: '24 Oct 2024',
      overdue: '1 Nov 2024',
      status: 'Promised',
      secondment: 'Juni 2024',
    },
    {
      billingNumber: '1547/2024	',
      payer: 'Abby & Wells',
      amount: '47,755,030',
      collecctionRation: '20',
      fic: '(IND) Jacob Jones Jones',
      date: '24 Oct 2024',
      overdue: '1 Nov 2024',
      status: 'Prebill',
    },
  ];

  /** Tab Utility */
  dataTabs: {
    active: boolean | 'disabled';
    icon?: Icon;
    sideIcon?: 'right' | 'left';
    sizeIcon?: Size;
    prepend?: string;
    append?: string;
    title: string;
  }[] = [
    {
      active: true,
      title: 'Details',
    },
    {
      active: false,
      title: 'Attachments (1)',
    },
    {
      active: false,
      title: 'Comments (2)',
    },
  ];

  /** Flyout Data */
  titleTableFlyout: string[] = [
    'Items',
    'Base Amount',
    'Discount',
    'Amount After Discount',
  ];

  dataTableFlyout: DetailBillingDTO[] = [
    {
      item: {
        billing: '9630 - Legal Fee',
        service:
          'Legal service fee for 9630::AHP seconded 1 advocate to PT ANTAM Tbk for 1 year to handle litigation case in PT ANTAM Tbk',
      },
      baseAmount: '1,400.00',
      discount: '(100.00)',
      ammountAfterDisc: '1,300.00',
    },
  ];

  showSubtotal: boolean = false;
  showSubDisc: boolean = false;
  showOtherInformation: boolean = false;

  /** Getting color from status check */
  colorBadge(
    status:
      | 'Draft'
      | 'Ongoing'
      | 'Offgoing'
      | 'System Client'
      | 'Confirmed'
      | 'Promised'
      | 'Difficult'
      | 'Non-Performing'
      | 'Installment'
      | 'Paid'
      | 'Completion'
      | 'Delete'
      | 'Prebill'
  ): string {
    if (status === 'Draft' || status === 'Prebill') {
      return 'hollow';
    }
    if (
      status === 'Confirmed' ||
      status === 'Promised' ||
      status === 'Installment' ||
      status === 'Paid'
    ) {
      return 'success';
    }
    if (
      status === 'Ongoing' ||
      status === 'Offgoing' ||
      status === 'System Client'
    ) {
      return 'warning';
    }
    if (
      status === 'Difficult' ||
      status === 'Non-Performing' ||
      status === 'Delete'
    ) {
      return '#FF7E62';
    } else {
      return 'primary';
    }
  }

  /** Toggle for show other information */
  toggleShowOtherInform(param: 'subtotal' | 'disc' | 'other'): void {
    if (param === 'subtotal') {
      this.showSubtotal = !this.showSubtotal;
    }
    if (param === 'disc') {
      this.showSubDisc = !this.showSubDisc;
    }
    if (param === 'other') {
      this.showOtherInformation = !this.showOtherInformation;
    }
  }

  /** Open Flyout */
  toggleOpenFlyout(event: boolean): void {
    this.isOpenFlyout = event;
  }
}
