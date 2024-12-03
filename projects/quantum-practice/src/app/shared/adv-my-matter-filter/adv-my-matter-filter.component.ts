import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AdvanceFilterComponent,
  AdvanceFilterItemComponent,
  AdvanceFilterSectionComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FormControlLayoutComponent,
  InputFieldComponent,
  PrependComponent,
  SelectFieldComponent,
} from '@quantum/fui';
import { OptionDTO } from '../../core/dtos/response.dto';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'shared-adv-my-matter-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlLayoutComponent,
    PrependComponent,
    InputFieldComponent,
    ComboBoxComponent,
    DateRangeComponent,
    SelectFieldComponent,
    AdvanceFilterComponent,
    AdvanceFilterSectionComponent,
    AdvanceFilterItemComponent,
  ],
  providers: [DecimalPipe],
  templateUrl: './adv-my-matter-filter.component.html',
  styleUrl: './adv-my-matter-filter.component.scss',
})
export class AdvMyMatterFilterComponent {
  @Input({ required: true }) openFilter: boolean = false;
  @Input() selectOption: { label: string; value: any }[] = [
    {
      label: 'Like',
      value: 'Like',
    },
    {
      label: 'Equal',
      value: 'Equal',
    },
    {
      label: 'Is',
      value: 'Is',
    },
  ];

  @Output() action: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Show hide advance filter */
  isCollapsible: boolean = false;

  /** Client name form */
  clientNameForm: FormControl = new FormControl('');
  clientNameOption: OptionDTO[] = [];
  clientNameSelected: OptionDTO[] = [];

  /** Matter/Sub-matter Number */
  matterForm: FormControl = new FormControl('');
  matterOption: OptionDTO[] = [];
  matterSelected: OptionDTO[] = [];

  /** Project name */
  projectNameForm: FormControl = new FormControl('');

  /** Matter description */
  matterDescriptionForm: FormControl = new FormControl('');

  /** Billability */
  billabilityForm: FormControl = new FormControl('');
  billabilityOption: OptionDTO[] = [];
  billabilitySelected: OptionDTO[] = [];

  /** Practice Group */
  practiceGroupForm: FormControl = new FormControl('');
  practiceGroupOption: OptionDTO[] = [];
  practiceGroupSelected: OptionDTO[] = [];

  /** Practice Area */
  practiceAreaForm: FormControl = new FormControl('');
  practiceAreaOption: OptionDTO[] = [];
  practiceAreaSelected: OptionDTO[] = [];

  /** Matter type */
  matterTypeForm: FormControl = new FormControl('');
  matterTypeOption: OptionDTO[] = [];
  matterTypeSelected: OptionDTO[] = [];

  /** Matter status */
  matterStatusForm: FormControl = new FormControl('');
  matterStatusOption: OptionDTO[] = [];
  matterStatusSelected: OptionDTO[] = [];

  /** Fee structure */
  feeStructureForm: FormControl = new FormControl('');
  feeStructureOption: OptionDTO[] = [];
  feeStructureSelected: OptionDTO[] = [];

  /** Partner in charge */
  partnerInChargeForm: FormControl = new FormControl('');
  partnerInChargeOption: OptionDTO[] = [];
  partnerInChargeSelected: OptionDTO[] = [];

  /** Partner in charge */
  matterMembersForm: FormControl = new FormControl('');
  matterMembersOption: OptionDTO[] = [];
  matterMembersSelected: OptionDTO[] = [];

  /** Unbilled Amount R3 */
  unbilledAmountForm: FormControl = new FormControl('');

  /** Creation date */
  creationDateStartForm: FormControl = new FormControl('');
  creationDateEndForm: FormControl = new FormControl('');

  /** Completion date */
  completionDateStartForm: FormControl = new FormControl('');
  completionDateEndForm: FormControl = new FormControl('');

  totalFilter: number = 0;

  /** Observe form */
  subscription!: Subscription;

  constructor(private readonly decimalPipe: DecimalPipe) {}

  ngOnInit(): void {
    this.subscription = this.unbilledAmountForm.valueChanges
      .pipe(
        tap((value) => {
          this.unbilledAmountForm.setValue(this.formatNumber(value));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Number/String converter to be 1.000.000 from 1000000 */
  formatNumber(value: number | string): string {
    if (value === null || value === undefined) {
      return '';
    }
    const numericValue =
      typeof value === 'string'
        ? parseFloat(value.replace(/\./g, '').replace(',', '.'))
        : value;

    if (isNaN(numericValue)) {
      return '';
    }
    const formattedValue = this.decimalPipe.transform(numericValue, '1.0-0');
    return formattedValue ? formattedValue.replace(/,/g, '.') : '';
  }

  /** Array to string */
  getFormattedNames(
    param: {
      name: string;
      value: any;
    }[]
  ): string {
    const names = param.map((item) => item.name);

    if (names.length <= 3) {
      return names.join(', ');
    } else {
      const firstThree = names.slice(0, 3).join(', ');
      const remainingCount = names.length - 3;
      return `${firstThree}, ${remainingCount}+`;
    }
  }

  /** Observe adv filter ouput */
  actionOut(event: boolean | 'filter' | 'clear'): void {
    this.totalFilter = 0;
    if (event === true || event === false) {
      this.openFilter = event;
    }
    if (event === 'clear') {
      this.clientNameSelected = [];
      this.matterSelected = [];
      this.projectNameForm = new FormControl('');
      this.matterDescriptionForm = new FormControl('');

      this.billabilitySelected = [];
      this.practiceGroupSelected = [];
      this.practiceAreaSelected = [];
      this.matterTypeSelected = [];
      this.matterStatusSelected = [];
      this.feeStructureSelected = [];
      this.partnerInChargeSelected = [];
      this.matterMembersSelected = [];
      this.unbilledAmountForm = new FormControl('');
      this.completionDateStartForm = new FormControl('');
      this.completionDateEndForm = new FormControl('');
      this.creationDateStartForm = new FormControl('');
      this.creationDateEndForm = new FormControl('');
    }
    if (event === 'filter') {
      if (this.clientNameSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.matterSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.projectNameForm.value || this.projectNameForm.value !== '') {
        this.totalFilter = this.totalFilter + 1;
      }
      if (
        this.matterDescriptionForm.value ||
        this.matterDescriptionForm.value !== ''
      ) {
        this.totalFilter = this.totalFilter + 1;
      }

      if (this.billabilitySelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.practiceGroupSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.practiceAreaSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.matterTypeSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.matterStatusSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.feeStructureSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.partnerInChargeSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.matterMembersSelected.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (
        this.unbilledAmountForm.value ||
        this.unbilledAmountForm.value !== ''
      ) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (
        this.completionDateStartForm.value ||
        this.completionDateStartForm.value !== ''
      ) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (
        this.creationDateStartForm.value ||
        this.creationDateStartForm.value !== ''
      ) {
        this.totalFilter = this.totalFilter + 1;
      }
      this.openFilter = false;
    }
    console.log(this.creationDateStartForm.value);
    console.log(this.creationDateEndForm.value);
    this.action.emit(this.openFilter);
  }

  validatorStartEndFilter(start: string, end: string): boolean {
    let startDateObj = new Date(start.split('-').reverse().join('-'));
    let endDateObj = new Date(end.split('-').reverse().join('-'));
    if (startDateObj < endDateObj) {
      return false;
    } else {
      return true;
    }
  }

  /** Observe date creation */
  onChangeDateCreation(event: string, param: 'start' | 'end'): void {
    if (param === 'start') {
      this.creationDateStartForm.setValue(event);
    }
    if (param === 'end') {
      this.creationDateEndForm.setValue(event);
    }
  }

  /** Observe date completion */
  onChangeDateCompletion(event: string, param: 'start' | 'end'): void {
    if (param === 'start') {
      this.completionDateStartForm.setValue(event);
    }
    if (param === 'end') {
      this.completionDateEndForm.setValue(event);
    }
  }
}
