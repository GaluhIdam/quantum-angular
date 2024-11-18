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
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  Size,
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
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
  ],
  templateUrl: './billings.component.html',
  styleUrl: './billings.component.scss',
})
export class BillingsComponent {
  /** Modal Billing Status Info */
  openModalBillingStatus: boolean = false;

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
    {
      item: {
        billing: '9630 - OPE',
        service:
          'Legal service fee for 9630::AHP seconded 1 advocate to PT ANTAM Tbk for 1 year to handle litigation case in PT ANTAM Tbk',
      },
      baseAmount: '500.00',
      discount: '-',
      ammountAfterDisc: '500.00',
    },
    {
      item: {
        billing: '5430 - Legal Fee',
        service:
          'Legal service fee for 9630::AHP seconded 1 advocate to PT ANTAM Tbk for 1 year to handle litigation case in PT ANTAM Tbk',
      },
      baseAmount: '1,100.00',
      discount: '(200.00)',
      ammountAfterDisc: '900.00',
    },
  ];

  showSubtotal: boolean = false;
  showSubDisc: boolean = false;
  showOtherInformation: boolean = false;
  showIdr: boolean = false;

  /** Tab status */
  tabStatus: 'details' | 'attachments' | 'comments' = 'details';

  totalAttachments: number = 1;
  totalComments: number = 2;

  /** Status Billing Info */
  statusBillingList: {
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
      | 'Prebill';
    desc: string;
  }[] = [
    {
      status: 'Draft',
      desc: 'The invoice is still undergoing content finalization, either internally at AHP or on the client’s side.',
    },
    {
      status: 'Ongoing',
      desc: 'The Proforma or Final date is ≤30 days and no indicative payment confirmation from the client.',
    },
    {
      status: 'Offgoing',
      desc: 'The Proforma or Final date is >30 days but ≤90 days and no indicative payment confirmation from the client.',
    },
    {
      status: 'System Client',
      desc: 'The Proforma or Final has been issued and the invoice details, including timesheet, are put into the client’s billing system.',
    },
    {
      status: 'Confirmed',
      desc: 'The Proforma or Final has been sent and the client confirmed to pay within 30 days (≤30 days).',
    },
    {
      status: 'Promised',
      desc: 'The Proforma or Final has been sent and the client promised to pay above 30 days later (>30 days).',
    },
    {
      status: 'Difficult',
      desc: 'The Proforma or Final date is  >90 days but ≤365 days without any indicative payment confirmation.',
    },
    {
      status: 'Non-Performing',
      desc: 'The Proforma or Final date is >365 days, or no communication, or severely challenging to engage the client for payment.',
    },
    {
      status: 'Installment',
      desc: 'Payment has been partially received.',
    },
    {
      status: 'Paid',
      desc: 'Payment has been fully received.',
    },
    {
      status: 'Completion',
      desc: 'All payment and administrative requirements, including withholding (WAPU) proof, have been met. No outstanding and no unbalance amount left.',
    },
    {
      status: 'Delete',
      desc: 'The Proforma or Final has been issued; however, at the request of the PIC/SA the invoice process is to be discontinued.',
    },
  ];

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
      return '#7aaada';
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

  /** Toggle show idr/dollar */
  toggleShowIDR(): void {
    this.showIdr = !this.showIdr;
  }

  /** Toggle Tab */
  toggleTab(param: 'details' | 'attachments' | 'comments'): void {
    this.tabStatus = param;
  }

  /** Open/Close Modal Billing Status */
  toggleModalBillingStatus(param: boolean): void {
    this.openModalBillingStatus = param;
  }
}
