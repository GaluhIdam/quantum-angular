import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  Icon,
  IconsComponent,
  InputFieldComponent,
  LinkComponent,
  PrependComponent,
  SelectFieldComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextareaComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';
import { SliderCardComponent } from '../../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { Subscription } from 'rxjs';
import { BaseController } from '../../../../../core/controller/basecontroller';
import { FlyoutContactPersonComponent } from '../../flyout-shared/flyout-contact-person/flyout-contact-person.component';
import { FlyoutLumpsumTermComponent } from '../../flyout-shared/flyout-lumpsum-term/flyout-lumpsum-term.component';
import { FlyoutRetainerTermComponent } from '../../flyout-shared/flyout-retainer-term/flyout-retainer-term.component';

@Component({
  selector: 'app-payer-information',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextComponent,
    ComboBoxComponent,
    ButtonIconComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
    LinkComponent,
    InputFieldComponent,
    PrependComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyComponent,
    TableBodyRowComponent,
    TableBodyDataComponent,
    BadgeComponent,
    DatePickerComponent,
    TextareaComponent,
    TooltipComponent,
    IconsComponent,
    FlyoutContactPersonComponent,
    FlyoutLumpsumTermComponent,
    FlyoutRetainerTermComponent,
  ],
  templateUrl: './payer-information.component.html',
  styleUrl: './payer-information.component.scss',
})
export class PayerInformationComponent extends BaseController {
  @Input() billabiltiySelection: string = '';

  title: string[] = ['#', 'Description', 'Amount', ''];
  titleRetainer: string[] = ['#', 'Period', 'Term', 'Description', ''];

  /** Paying Entity Form */
  isPayingEntity: boolean = false;
  payingEntityForm: FormControl = new FormControl('');
  payingEntityOption: {
    name: string;
    value: any;
  }[] = [
    {
      name: 'Acme Corporation',
      value: {
        parent: 'Acme Corporation',
        companyOrigin: 'USA',
        address: '123 Elm Street, Suite 400, San Francisco, CA 94107',
        entityType: 'Private',
        industry: 'Technology',
      },
    },
    {
      name: 'Globex Corporation',
      value: {
        parent: 'Global Industries Ltd.',
        companyOrigin: 'UK',
        address: '456 Oxford Road, Building A, London, W1D 1AN',
        entityType: 'Public',
        industry: 'Manufacturing',
      },
    },
    {
      name: 'Initech LLC',
      value: {
        parent: 'Initech Holdings',
        companyOrigin: 'USA',
        address: '789 Innovation Drive, Suite 300, Austin, TX 73301',
        entityType: 'Private',
        industry: 'Software Development',
      },
    },
    {
      name: 'Soylent Corporation',
      value: {
        parent: 'Soylent Group',
        companyOrigin: 'Germany',
        address: '12 Factory Lane, Berlin, 10178',
        entityType: 'Public',
        industry: 'Food & Beverage',
      },
    },
    {
      name: 'Umbrella Corporation',
      value: {
        parent: 'Umbrella Group',
        companyOrigin: 'Switzerland',
        address: '16 Alpine Road, Zurich, 8001',
        entityType: 'Private',
        industry: 'Pharmaceuticals',
      },
    },
    {
      name: 'Stark Industries',
      value: {
        parent: 'Stark Enterprises',
        companyOrigin: 'USA',
        address: '10880 Malibu Point, Malibu, CA 90265',
        entityType: 'Private',
        industry: 'Defense',
      },
    },
  ];
  payingEntitySelected: {
    name: string;
    value: any;
  }[] = [];
  payingEntitySlider: {
    id: number;
    title: string;
    status: boolean;
    icon: Icon;
    link: string;
  }[] = [];
  currentSlideIndexPayingEntity: number = 0;

  /** Contact Person Form */
  contactPersonForm: FormControl = new FormControl('');
  contactPersonOption: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'Jane Cooper (JC)',
      value: 'JC',
    },
    {
      label: 'Devon Lane (DL)',
      value: 'DL',
    },
    {
      label: 'Robert Fox (RF)',
      value: 'RF',
    },
  ];

  /** Pricing Type Form */
  isPricingTypeForm: boolean = false;
  pricingTypeForm: FormControl = new FormControl('Lumpsum');
  pricingTypeOption: { label: string; value: string }[] = [
    {
      label: 'Lumpsum',
      value: 'Lumpsum',
    },
    {
      label: 'Retainer',
      value: 'Retainer',
    },
    {
      label: 'Hourly',
      value: 'Hourly',
    },
    {
      label: 'Cap',
      value: 'Cap',
    },
  ];

  /** Currency Form */
  currencyForm: FormControl = new FormControl('USD');
  currencyOption: { label: string; value: string }[] = [
    {
      label: 'IDR',
      value: 'IDR',
    },
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
  ];

  /** Estimated Fee Form */
  isEstimatedFee: boolean = false;
  estimatedFeeForm: FormControl = new FormControl('');

  /** Cap Fee Form */
  capFeeForm: FormControl = new FormControl('');

  /** Start & End Period Form */
  startPeriodForm: FormControl = new FormControl('');
  endPeriodForm: FormControl = new FormControl('');

  /** Billing Note Form */
  billingNoteForm: FormControl = new FormControl('');
  isBillingNote: boolean = false;

  /**  Lumpsum Term Form Flyout */
  lumpsumPaymentOrderForm: FormControl = new FormControl(
    '',
    Validators.required
  );
  lumpsumAmountForm: FormControl = new FormControl('', Validators.required);
  lumpsumdescForm: FormControl = new FormControl('', Validators.required);
  dataLumpsum: {
    status?: 'Collected' | 'Written-off';
    addOn?: string;
    paymentOrder: number;
    desc: string;
    amount: string;
  }[] = [
    {
      status: 'Collected',
      addOn: '1140/2024',
      paymentOrder: 1,
      desc: 'Billed upon completion of first phase',
      amount: '5,000.00',
    },
    {
      paymentOrder: 2,
      desc: 'Billed upon project document fully delivered',
      amount: '10,000.00',
    },
    {
      status: 'Written-off',
      paymentOrder: 3,
      desc: 'Term Bonuses, Sign Off',
      amount: '1,000.00',
    },
  ];
  addEditLumpsum: boolean = true;

  /** Retainer Term Form Flyout */
  retainerPaymentOrderForm: FormControl = new FormControl('');
  retainerPeriodForm: FormControl = new FormControl('');
  retainerAmountForm: FormControl = new FormControl('');
  retainerDurationForm: FormControl = new FormControl('');
  retainerDescForm: FormControl = new FormControl('');
  dataRetainer: {
    status?: 'Collected' | 'Written-off';
    addOn?: string;
    paymentOrder: number;
    period: string;
    amount: string;
    hours: number;
    desc: string;
  }[] = [
    {
      status: 'Collected',
      addOn: '1140/2024',
      paymentOrder: 1,
      period: 'Jan 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
    {
      status: 'Collected',
      addOn: '1140/2024',
      paymentOrder: 2,
      period: 'Feb 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
    {
      paymentOrder: 3,
      period: 'Mar 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
    {
      status: 'Written-off',
      paymentOrder: 4,
      period: 'Apr 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
  ];
  addEditRetainer: boolean = true;

  /** Special rate form flyout */
  matterNumberForm: FormControl = new FormControl('');
  matterNumberOption: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'Jane Cooper (JC)',
      value: 'Jane Cooper (JC)',
    },
    {
      label: 'Devon Lane (DL)',
      value: 'Devon Lane (DL)',
    },
    {
      label: 'Robert Fox (RF)',
      value: 'Robert Fox (RF)',
    },
  ];
  rateForm: FormControl = new FormControl('');
  startPeriodRateForm: FormControl = new FormControl('');
  endPeriodRateForm: FormControl = new FormControl('');
  dataSpecialRate: {
    member: string;
    position: string;
    rates: { rate: number; start: string; end: string }[];
  }[] = [
    {
      member: 'Jane Cooper (JC)',
      position: 'Senior Associates',
      rates: [
        {
          rate: 300,
          start: '1 Feb, 2024',
          end: '28 Feb, 2024',
        },
        {
          rate: 250,
          start: '1 Jan, 2024',
          end: '31 Jan, 2024',
        },
      ],
    },
  ];
  addEditSpecialRate: boolean = false;

  dataSlider: {
    id: number;
    title: string;
    status: boolean;
    icon: Icon;
    link: string;
  }[] = [
    {
      id: 1,
      title: 'Big Kahuna Burger Ltd.',
      link: '',
      status: true,
      icon: 'node',
    },
    {
      id: 2,
      title: 'Miniso Lifestyle Trading Indonesia',
      link: '',
      status: false,
      icon: 'node',
    },
    {
      id: 3,
      title: 'Global Industries Ltd',
      link: '',
      status: false,
      icon: 'node',
    },
  ];

  currentSlideIndex: number = 0;

  clientData: {
    parent: string;
    companyOrigin: string;
    address: string;
    entityType: string;
    industry: string;
  }[] = [
    {
      parent: 'N/A',
      companyOrigin: 'N/A',
      address:
        'Puri Imperium Office Plaza, G-7 Jl. Kuningan Madya Kav 5-6, Kuningan',
      entityType: 'MNC Regional',
      industry: 'General Retail',
    },
    {
      parent: 'Acme Corporation',
      companyOrigin: 'USA',
      address: '123 Elm Street, Suite 400, San Francisco, CA 94107',
      entityType: 'Private',
      industry: 'Technology',
    },
    {
      parent: 'Global Industries Ltd.',
      companyOrigin: 'UK',
      address: '456 Oxford Road, Building A, London, W1D 1AN',
      entityType: 'Public',
      industry: 'Manufacturing',
    },
  ];

  /** Flyout Vraiable */
  isFlyoutContactPerson: boolean = false;
  isFlyoutLumpsumTerm: boolean = false;
  isFlyoutRetainerTerm: boolean = false;
  titleFlyout: string = '';

  obs!: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.setPricingTypeByBillable(this.billabiltiySelection);
    }
  }

  ngOnDestroy(): void {
    if (this.obs) {
      this.obs.unsubscribe();
    }
  }

  /** Catch changes from slide controller */
  slideOut(event: number): void {
    this.currentSlideIndex = event;
  }

  /** Open/Close Flyout */
  openCloseFlyout(param: 'CP' | 'LT' | 'RL', title?: string): void {
    if (param === 'CP') {
      this.isFlyoutContactPerson = !this.isFlyoutContactPerson;
    }
    if (param === 'LT' && title) {
      this.titleFlyout = title;
      this.isFlyoutLumpsumTerm = !this.isFlyoutLumpsumTerm;
    }
    if (param === 'RL' && title) {
      this.titleFlyout = title;
      this.isFlyoutRetainerTerm = !this.isFlyoutRetainerTerm;
    }
  }

  /** Selection Paying Entiity Form */
  selectionPayingEntity(event: any): void {
    this.payingEntitySelected = event;
    this.payingEntitySlider = [];
    if (this.payingEntitySelected.length > 0) {
      this.payingEntitySelected.forEach((item, i) => {
        this.payingEntitySlider.push({
          id: i,
          title: item.name,
          status: i === 0 ? true : false,
          icon: 'node',
          link: '#',
        });
      });
    }
  }

  /** Set Pricing Type */
  setPricingTypeByBillable(param: string): void {
    if (param === 'Billable') {
      this.pricingTypeForm.setValue('Lumpsum');
    }
    if (param === 'Potential Matter') {
      this.pricingTypeForm.setValue('Hourly');
      this.isPricingTypeForm = true;
    }
  }
}
