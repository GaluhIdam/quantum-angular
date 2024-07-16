import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { FilterAplliedDTO } from '../../../../../../shared/filter-applied/filter-apllied.dto';
import {
  MatterDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../../../../my-timesheet/dtos/my-timesheet.dto';
import { FilterAppliedComponent } from '../../../../../../shared/filter-applied/filter-applied.component';

@Component({
  selector: 'app-utility',
  standalone: true,
  imports: [
    CommonModule,
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
    FilterAppliedComponent,
  ],
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss',
})
export class UtilityComponent extends BaseController {
  /** Data will input from DetailMatterComponent */
  /** Filter Applied */
  @Input() filterApplied: FilterAplliedDTO[] = [];
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() currentDate: Date = new Date();
  @Input() startDateForm: FormControl = new FormControl();
  @Input() endDateForm: FormControl = new FormControl();

  /** Data will output to HistoryActivityComponent */
  @Output() filterAction: EventEmitter<{
    startDate: string;
    endDate: string;
    description: string;
    filterApplied: FilterAplliedDTO[];
  }> = new EventEmitter<{
    startDate: string;
    endDate: string;
    description: string;
    filterApplied: FilterAplliedDTO[];
  }>();
  @Output() clearFilterAll: EventEmitter<FilterAplliedDTO[]> = new EventEmitter<
    FilterAplliedDTO[]
  >();

  endDate: Date = new Date();
  startDate: Date = new Date();

  dateTimesheetByDate: TimesheetByDateDTO[] = [];
  descriptionForm: FormControl = new FormControl('');
  isOpenFlyout: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.filterApplied.forEach((item) => {
        switch (item.name) {
          case 'Date':
            if (!item.status) {
              this.startDateForm.setValue(this.defaultDate().startDateForm);
              this.endDateForm.setValue(this.defaultDate().endDateForm);
              this.descriptionForm.setValue('');
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
  }

  /** Filter timesheet action */
  applyFilterAction(): void {
    this.enableFilter('Date', true);
    this.isOpenFlyout = false;
    if (
      this.descriptionForm.value !== null &&
      this.descriptionForm.value !== ''
    ) {
      this.filterApplied.forEach((item) => {
        if (item.name === 'Time Description') {
          item.status = true;
        }
      });
    }
    this.filterAction.emit({
      startDate: this.startDateForm.value,
      endDate: this.endDateForm.value,
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
    this.startDateForm = new FormControl(this.defaultDate().startDateForm);
    this.endDateForm = new FormControl(this.defaultDate().endDateForm);
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

  /** Clear all filter */
  clearAllFilterOut(event: FilterAplliedDTO[]): void {
    this.filterApplied = event;
    this.startDateForm.setValue(this.defaultDate().startDateForm);
    this.endDateForm.setValue(this.defaultDate().endDateForm);
    this.descriptionForm.reset();
  }

  /** Clear Filter Per Item */
  clearFilterPerItemOut(event: FilterAplliedDTO[]): void {
    this.filterApplied = event;
    const desc: boolean = this.filterApplied.some((item) => {
      if (item.name === 'Time Description') {
        item.status;
      }
    });
    if (!desc) {
      this.descriptionForm.reset();
    }
  }
}
