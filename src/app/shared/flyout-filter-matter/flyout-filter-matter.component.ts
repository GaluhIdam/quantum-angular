import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
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
} from '@quantum/fui';
import { OptionDTO } from '../../core/dtos/response.dto';
import { Subscription, tap } from 'rxjs';
@Component({
  selector: 'shared-flyout-filter-matter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlLayoutComponent,
    PrependComponent,
    InputFieldComponent,
    ComboBoxComponent,
    DateRangeComponent,
    AdvanceFilterComponent,
    AdvanceFilterItemComponent,
    AdvanceFilterSectionComponent,
  ],
  providers: [DecimalPipe],
  templateUrl: './flyout-filter-matter.component.html',
  styleUrl: './flyout-filter-matter.component.scss',
})
export class FlyoutFilterMatterComponent {
  @Input({ required: true }) isOpenFlyout: boolean = false;
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

  @Output() action: EventEmitter<boolean | 'filter' | 'clear'> =
    new EventEmitter<boolean | 'filter' | 'clear'>();

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

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.isOpenFlyout = false;
    this.action.emit(false);
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

  /** Toggle for close flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
    this.action.emit(false);
  }

  /** Toggle for open/close collapsible */
  toggleCollapsible(): void {
    this.isCollapsible = !this.isCollapsible;
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
