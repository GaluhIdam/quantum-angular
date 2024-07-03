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
  TooltipComponent,
} from '@quantum/fui';
import { BaseController } from '../../../../../../core/controller/basecontroller';
import {
  MatterDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../../../dtos/my-timesheet.dto';
import { FilterAplliedDTO } from '../../../../../../shared/filter-applied/filter-apllied.dto';

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
  ],
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss',
})
export class UtilityComponent extends BaseController {
  /** Data will input from HistoryActivityComponent */
  /** Filter Applied */
  @Input() filterApplied: FilterAplliedDTO[] = [];
  @Input() listMatter: MatterDTO[] = [];
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() currentDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Input() startDate: Date = new Date();
  @Input() startDateForm: FormControl = new FormControl();
  @Input() endDateForm: FormControl = new FormControl();

  /** Data will output to HistoryActivityComponent */
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
  @Output() clearFilterAll: EventEmitter<FilterAplliedDTO[]> = new EventEmitter<
    FilterAplliedDTO[]
  >();
  @Output() dateTimesheetByDateOut: EventEmitter<TimesheetByDateDTO[]> =
    new EventEmitter<TimesheetByDateDTO[]>();
  @Output() dateMoveChanger: EventEmitter<{
    startDate: string;
    endDate: string;
  }> = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>();

  dateTimesheetByDate: TimesheetByDateDTO[] = [];
  searchMatterForm: FormControl = new FormControl('');
  optionMatter: { name: string; value: any }[] = [];
  selectedMatter: { name: string; value: any }[] = [];
  descriptionForm: FormControl = new FormControl('');
  isOpenFlyout: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.dateTimesheetByDate = this.groupingTimesheetByRangeDate(
        this.dataTimesheet,
        this.startDateForm.value,
        this.endDateForm.value
      );
      this.listMatter.forEach((item) => {
        this.optionMatter.push({
          name: item.matter,
          value: item.idMatter,
        });
      });
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
    this.dateTimesheetByDateOut.emit(this.dateTimesheetByDate);
  }

  /** Mode date by date */
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

  /** Filter timesheet action */
  applyFilterAction(): void {
    this.enableFilter('Date', true);
    this.isOpenFlyout = false;
    this.filterAction.emit({
      startDate: this.startDateForm.value,
      endDate: this.endDateForm.value,
      selectedMatter: this.selectedMatter.map((item) => item.name).join(', '),
      description: this.descriptionForm.value,
      filterApplied: this.filterApplied,
    });
  }

  /** Toggle for open flyout */
  toggleOpenFlyout(): void {
    this.isOpenFlyout = true;
  }
  /** Toggle for open flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
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
    this.isOpenFlyout = false;
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
}
