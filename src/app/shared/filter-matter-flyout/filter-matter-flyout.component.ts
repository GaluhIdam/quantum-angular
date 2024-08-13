import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  PrependComponent,
  SelectFieldComponent,
} from '@quantum/fui';
import { OptionDTO } from '../../core/dtos/response.dto';
import { Subscription, tap } from 'rxjs';
@Component({
  selector: 'shared-filter-matter-flyout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlLayoutComponent,
    PrependComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    FlyoutBodyComponent,
    FlyoutComponent,
    FlyoutFooterComponent,
    FlyoutHeaderComponent,
    CollapsibleNavGroupComponent,
    ComboBoxComponent,
    DateRangeComponent,
    SelectFieldComponent,
  ],
  providers: [DecimalPipe],
  templateUrl: './filter-matter-flyout.component.html',
  styleUrl: './filter-matter-flyout.component.scss',
})
export class FilterMatterFlyoutComponent {
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
}
