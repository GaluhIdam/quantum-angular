import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';
import { BaseController } from '../../../../../core/controller/basecontroller';
import {
  MatterDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../../dtos/my-timesheet.dto';
import { FilterAplliedDTO } from '../../../../../shared/filter-applied/filter-apllied.dto';
import { CreateTimesheetFlyoutComponent } from '../../../../../shared/create-timesheet-flyout/create-timesheet-flyout.component';

@Component({
  selector: 'app-utility',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonIconComponent,
    BadgeComponent,
    FlyoutBodyComponent,
    FlyoutComponent,
    FlyoutFooterComponent,
    FlyoutHeaderComponent,
    DateRangeComponent,
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    TooltipComponent,
    CreateTimesheetFlyoutComponent,
    TextComponent,
  ],
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss',
})
export class UtilityComponent extends BaseController {
  /** Show/Hide button next or previous date */
  @Input() btnUtility: boolean = true;

  /** Data will input from HistoryActivityComponent */
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() listMatter: MatterDTO[] = [];
  @Input() filterApplied: FilterAplliedDTO[] = [];

  /** How many filter apllied and send to consumer */
  @Output() filterAction: EventEmitter<{
    startDate: string;
    endDate: string;
    selectedMatter: string;
    description: string;
    filterApplied: FilterAplliedDTO[];
  }> = new EventEmitter<{
    startDate: string;
    endDate: string;
    selectedMatter: string;
    description: string;
    filterApplied: FilterAplliedDTO[];
  }>();

  /** Parsing filter is clear */
  @Output() clearFilterAll: EventEmitter<FilterAplliedDTO[]> = new EventEmitter<
    FilterAplliedDTO[]
  >();

  /** Parsing timesheet after generate by date */
  @Output() dateTimesheetByDateOut: EventEmitter<TimesheetByDateDTO[]> =
    new EventEmitter<TimesheetByDateDTO[]>();

  /** Change date by next or previous */
  @Output() dateMoveChanger: EventEmitter<{
    startDate: string;
    endDate: string;
  }> = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>();

  /** Open create timesheet flyout */
  @Output() clickOpenCreateFlyout: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /** Date for without filter */
  endDate: Date = new Date();
  startDate: Date = new Date();

  /** After gruping by date, data will return to consumer */
  dateTimesheetByDate: TimesheetByDateDTO[] = [];

  /** Date Now */
  currentDate: Date = new Date();

  /** Start date form */
  startDateForm: FormControl = new FormControl();

  /** End date form */
  endDateForm: FormControl = new FormControl();

  /** Matter form */
  searchMatterForm: FormControl = new FormControl('');
  optionMatter: { name: string; value: any }[] = [];
  selectedMatter: { name: string; value: any }[] = [];

  /** Additional description form */
  descriptionForm: FormControl = new FormControl('');

  /** Variable for open/close filter timesheet flyout */
  isOpenFilterFlyout: boolean = false;

  /** Variable for open/close create timesheet flyout */
  isOpenCreateFlyout: boolean = false;

  constructor() {
    super();
    /** Replace start date and end date */
    this.startDate = new Date(this.defaultDate().startDateForm);
    this.endDate = new Date(this.defaultDate().endDateForm);

    /** Replace start date form and end date form in filter flyout */
    this.startDateForm.setValue(this.defaultDate().startDateForm);
    this.endDateForm.setValue(this.defaultDate().endDateForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      /** Grouping data timesheet by date */
      this.groupingTimesheet();

      /** Restructure data list matters to be options */
      this.restructureMatter();

      /** Condition for what filter applied */
      this.checkConditionFilterApplied();
    }
  }

  /** Grouping data timesheet by date */
  groupingTimesheet(): void {
    this.dateTimesheetByDate = this.groupingTimesheetByRangeDate(
      this.dataTimesheet,
      this.startDateForm.value,
      this.endDateForm.value
    );
    this.dateTimesheetByDateOut.emit(this.dateTimesheetByDate);
  }

  /** Restructure data list matters to be options */
  restructureMatter(): void {
    this.listMatter.forEach((item) => {
      this.optionMatter.push({
        name: item.matter,
        value: item.idMatter,
      });
    });
  }

  /** Condition for what filter applied */
  checkConditionFilterApplied(): void {
    if (
      !this.filterApplied.some(
        (item) => item.name === 'Matter' && item.status === false
      )
    ) {
      this.searchMatterForm.setValue('');
      this.selectedMatter = [];
    }
    this.filterApplied.forEach((item) => {
      switch (item.name) {
        case 'Date':
          if (!item.status) {
            this.startDateForm.setValue(this.defaultDate().startDateForm);
            this.endDateForm.setValue(this.defaultDate().endDateForm);
            this.selectedMatter = [];
            this.searchMatterForm.setValue('');
            this.descriptionForm.setValue('');
          }
          break;
        case 'Matter':
          if (!item.status) {
            this.searchMatterForm.setValue('');
            this.selectedMatter = [];
          }
          break;
        case 'Time Description':
          if (!item.status) {
            this.descriptionForm.setValue('');
          }
          break;
        default:
          break;
      }
    });
  }

  /** Move date and change regrouping data timesheet by date */
  moveDate(days: number): void {
    const newDate = new Date(this.endDate);
    newDate.setDate(newDate.getDate() + days);
    this.endDate = newDate;
    this.startDate = new Date(this.endDate);
    this.startDate.setDate(this.endDate.getDate() - 5);
    const startDate = this.formatDate(this.startDate);
    const endDate = this.formatDate(this.endDate);
    this.dateTimesheetByDate = this.groupingTimesheetByRangeDate(
      this.dataTimesheet,
      startDate,
      endDate
    );
    this.dateMoveChanger.emit({
      startDate: startDate,
      endDate: endDate,
    });
    this.dateTimesheetByDateOut.emit(this.dateTimesheetByDate);
  }

  /** Parsing data filter to consumer and close filter flyout */
  applyFilterAction(): void {
    this.enableFilter('Date', true);
    this.closeFilterFlyout();
    this.filterAction.emit({
      startDate: this.startDateForm.value,
      endDate: this.endDateForm.value,
      selectedMatter: this.selectedMatter.map((item) => item.name).join(', '),
      description: this.descriptionForm.value,
      filterApplied: this.filterApplied,
    });
  }

  /** Toggle for open flyout */
  openFilterFlyout(): void {
    this.isOpenFilterFlyout = true;
  }

  /** Toggle for open flyout */
  closeFilterFlyout(): void {
    this.isOpenFilterFlyout = false;
  }

  /** Observe for startDate changes */
  changeStartDate(event: string): void {
    this.startDateForm.setValue(event);
  }

  /** Observe for endDate changes */
  changeEndDate(event: string): void {
    this.endDateForm.setValue(event);
  }

  /** Matter Selection */
  selectionMatter(event: { name: string; value: any }[]): void {
    this.selectedMatter = event;
    if (event.length > 0) {
      this.enableFilter('Matter', true);
    } else {
      this.enableFilter('Matter', false);
    }
  }

  /** Invalid if start date less last date */
  invalidStartEndDate(): boolean {
    const startDate = new Date(this.startDateForm.value);
    const endDate = new Date(this.endDateForm.value);
    if (startDate < endDate) {
      return false;
    } else {
      return true;
    }
  }

  /** Clear filter but not reset ui */
  clearFilters(): void {
    console.log(this.defaultDate().startDateForm);
    this.startDateForm = new FormControl(this.defaultDate().startDateForm);
    this.endDateForm = new FormControl(this.defaultDate().endDateForm);
    this.selectedMatter = [];
    this.searchMatterForm.setValue('');
    this.descriptionForm.setValue('');
  }

  /** Clear filter but reset ui */
  clearFiltersAll(): void {
    this.clearFilters();
    this.filterApplied.forEach((item) => (item.status = false));
    this.closeFilterFlyout();
    this.clearFilterAll.emit(this.filterApplied);
  }

  /** Checking filter is on or not */
  checkFilter(): boolean {
    return this.filterApplied.some((item) => item.status == true);
  }

  /** Trigger for enable filter */
  enableFilter(param: string, status: boolean): void {
    this.filterApplied.forEach((item) => {
      item.name === param ? (item.status = status) : item.status;
    });
  }

  /** Toggle for open create timesheet flyout */
  openCreateFlyout(): void {
    this.clickOpenCreateFlyout.emit(true);
  }

  /** Catch changes from flyout */
  closeOut(event: boolean): void {
    this.isOpenCreateFlyout = event;
  }
}
