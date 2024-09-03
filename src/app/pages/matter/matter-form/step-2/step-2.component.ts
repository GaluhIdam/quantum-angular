import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AppendComponent,
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  ComboBoxComponent,
  FieldFilepickerComponent,
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
  ValidatorFieldComponent,
} from '@quantum/fui';
import { SliderCardComponent } from '../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';
import { Subscription, tap } from 'rxjs';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';

@Component({
  selector: 'step-2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsComponent,
    TextComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ValidatorFieldComponent,
    ButtonIconComponent,
    BadgeComponent,
    ComboBoxComponent,
    AppendComponent,
    PrependComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
    LinkComponent,
    CollapsibleNavGroupComponent,
    TextareaComponent,
    TooltipComponent,
    SelectFieldComponent,
    FlyoutSimpleComponent,
    FieldFilepickerComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyDataComponent,
    TableBodyRowComponent,
    EmptyDataComponent,
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss',
})
export class Step2Component {
  @Output() bill: EventEmitter<string> = new EventEmitter<string>();

  /** Matter Number Form */
  matterNumberForm: FormControl = new FormControl('', Validators.required);

  /** Parent Matter Form */
  parentMatterForm: FormControl = new FormControl('', Validators.required);
  isParentMatter: boolean = false;

  /** Conflict Search Id Form */
  conflictSearchIdForm: FormControl = new FormControl('', Validators.required);
  isConflictSearchId: boolean = false;

  /** Project Name Form */
  projectNameForm: FormControl = new FormControl('', Validators.required);
  isProjectName: boolean = false;

  /** Matter Short Desc Form */
  matterShortDescForm: FormControl = new FormControl('', Validators.required);
  isMatterShortDesc: boolean = false;

  /** Billable Form */
  billabilityForm: FormControl = new FormControl(
    'Billable',
    Validators.required
  );
  billableOption: { label: string; value: any }[] = [
    { label: 'Billable', value: 'Billable' },
    { label: 'Potential Matter', value: 'Potential Matter' },
    { label: 'Probono', value: 'Probono' },
    { label: 'Nonbillable', value: 'Nonbillable' },
  ];

  /** Matter Form */
  matterForm: FormControl = new FormControl('');

  /** Practice Matter Form */
  practiceMatterForm: FormControl = new FormControl('');
  practiceMatterOption: { label: string; value: any }[] = [
    {
      label: 'Practice Matter 1',
      value: 'Practice Matter 1',
    },
    {
      label: 'Practice Matter 2',
      value: 'Practice Matter 2',
    },
  ];

  /** Matter Type Form */
  matterTypeForm: FormControl = new FormControl('');
  matterTypeOption: { label: string; value: any }[] = [
    {
      label: 'Matter Type 1',
      value: 'Matter Type 1',
    },
    {
      label: 'Matter Type 2',
      value: 'Matter Type 2',
    },
  ];

  /** Person in Charge Form */
  personInChargeForm: FormControl = new FormControl('');

  /** Partner in Charge Form */
  partnerInChargeForm: FormControl = new FormControl('');

  /** Partner Referal Marketing Form */
  partnerReferalMarketingForm: FormControl = new FormControl('');

  /** Business Source Form */
  businessSourceForm: FormControl = new FormControl('');
  businessSourceOption: { label: string; value: any }[] = [
    {
      label: 'Business Source 1',
      value: 'Business Source 1',
    },
    {
      label: 'Business Source 2',
      value: 'Business Source 2',
    },
  ];
  /** Second Business Source Form */
  secondBusinessSourceForm: FormControl = new FormControl('');
  secondBusinessSourceOption: { label: string; value: any }[] = [
    {
      label: 'Second  Business Source 1',
      value: 'Second Business Source 1',
    },
    {
      label: 'Second Business Source 2',
      value: 'Second Business Source 2',
    },
  ];

  /** Client Name Form */
  clientNameForm: FormControl = new FormControl('');
  clientNameOption: {
    name: string;
    value: any;
  }[] = [
    {
      name: 'Acme Corporation',
      value: 'ACME_CORP_001',
    },
    {
      name: 'Globex Corporation',
      value: 'GLOBEX_CORP_002',
    },
    {
      name: 'Initech LLC',
      value: 'INITECH_LLC_003',
    },
  ];
  clientNameSelected: {
    name: string;
    value: any;
  }[] = [];

  /** Client Contact Person Form */
  isClientContactPerson: boolean = false;
  clientContactPersonForm: FormControl = new FormControl('');
  clientContactPersonOption: {
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

  /** Flyout Upload Matter Form */
  languageForm: FormControl = new FormControl('');
  languageOption: { label: string; value: any }[] = [
    {
      label: 'Bahasa',
      value: 'Bahasa',
    },
    {
      label: 'English',
      value: 'English',
    },
  ];
  descriptionForm: FormControl = new FormControl('');

  /** Matter Members Form */
  allEmployeList: { name: string; position: string }[] = [
    {
      name: 'Jane Cooper (JC)',
      position: 'Junior Associate',
    },
    {
      name: 'Devon Lane (DL)',
      position: 'Middle Associate',
    },
    {
      name: 'Robert Fox (RF)',
      position: 'Senior Associate',
    },
  ];
  selectedEmployeMatterMember: { name: string; position: string }[] = [];

  /** New Stakeholder Form */
  // General Information
  stakeholderNameForm: FormControl = new FormControl('');
  parentGroupCompanyForm: FormControl = new FormControl('');
  isParentGroupCompany: boolean = false;
  parentGroupCompanyOrigiinCountry: FormControl = new FormControl('');
  parentGroupCompanyOrigiinCountryOption: { label: string; value: any }[] = [];
  addressNameForm: FormControl = new FormControl('');
  companyNameForm: FormControl = new FormControl('');
  locationCompanyForm: FormControl = new FormControl('');

  // Billing Information
  npwpNumberForm: FormControl = new FormControl('');
  billingNameForm: FormControl = new FormControl('');
  isBillingAddress: boolean = false;
  billingAddressNameForm: FormControl = new FormControl('');
  billingAddressForm: FormControl = new FormControl('');
  locationBillingForm: FormControl = new FormControl('');

  isInstructingParty: boolean = false;

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

  title: string[] = ['Name', 'Position', ''];
  dataContent: { name: string; position: string }[] = [
    { name: 'Devon Lane (DL)', position: 'Senior Associate' },
  ];

  isCollapsed: boolean = false;
  isOpenFlyoutMatterForm: boolean = false;
  isOpenFlyoutManageMember: boolean = false;
  isOpenFlyoutManageController: boolean = false;
  isOpenFlyoutStakeHolder: boolean = false;
  isOpenFlyoutContactPerson: boolean = false;

  obs!: Subscription[];

  ngOnInit(): void {
    this.obs = [
      this.billabilityForm.valueChanges.subscribe((value) => {
        this.bill.emit(value);
      }),
    ];
  }

  ngOnDestroy(): void {
    this.obs.forEach((item) => {
      item.unsubscribe();
    });
  }

  /** Open/Close Flyout Matter Form */
  openFlyoutMatterForm(): void {
    this.isOpenFlyoutMatterForm = !this.isOpenFlyoutMatterForm;
  }

  /** Open/Close Flyout Manage Members */
  openFlyoutManageMember(): void {
    this.isOpenFlyoutManageMember = !this.isOpenFlyoutManageMember;
  }

  /** Open/Close Flyout Manage Controllers */
  openFlyoutManageController(): void {
    this.isOpenFlyoutManageController = !this.isOpenFlyoutManageController;
  }

  /** Open/Close Flyout Stakeholder */
  openFlyoutStakeholder(): void {
    this.isOpenFlyoutStakeHolder = !this.isOpenFlyoutStakeHolder;
  }

  /** Open/Close Flyout Contact Person */
  openFlyoutContactPerson(): void {
    this.isOpenFlyoutContactPerson = !this.isOpenFlyoutContactPerson;
  }

  /** Add or remove members for Matter Members */
  addRemoveMatterMember(
    item: { name: string; position: string },
    option: 'add' | 'remove'
  ): void {
    if (option === 'add') {
      this.selectedEmployeMatterMember.push(item);
    } else if (option === 'remove') {
      const index = this.selectedEmployeMatterMember.findIndex(
        (member) =>
          member.name === item.name && member.position === item.position
      );

      if (index !== -1) {
        this.selectedEmployeMatterMember.splice(index, 1);
      }
    }
  }

  slideOut(event: number): void {
    this.currentSlideIndex = event;
  }
}