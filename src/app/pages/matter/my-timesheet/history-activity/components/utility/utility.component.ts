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
} from '@quantum/fui';
import { BaseController } from '../../../../../../core/controller/basecontroller';
import {
  MatterDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../../../dtos/my-timesheet.dto';

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
  ],
  templateUrl: './utility.component.html',
  styleUrl: './utility.component.scss',
})
export class UtilityComponent extends BaseController {
  /** Data will input from HistoryActivityComponent */
  @Input() filterDate: boolean = false;
  @Input() filterMatter: boolean = false;
  @Input() filterTimeDescription: boolean = false;
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
    statusFilter: {
      filterDate: boolean;
      filterMatter: boolean;
      filterTimeDescription: boolean;
    };
  }> = new EventEmitter<{
    startDate: string;
    endDate: string;
    selectedMatter: string;
    description: string;
    statusFilter: {
      filterDate: boolean;
      filterMatter: boolean;
      filterTimeDescription: boolean;
    };
  }>();
  @Output() clearFilterAll: EventEmitter<{
    filterDate: boolean;
    filterMatter: boolean;
    filterTimeDescription: boolean;
  }> = new EventEmitter<{
    filterDate: boolean;
    filterMatter: boolean;
    filterTimeDescription: boolean;
  }>();
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
      if (!this.filterMatter) {
        this.searchMatterForm.setValue('');
        this.selectedMatter = [];
      }
      if (!this.filterTimeDescription) {
        this.descriptionForm.setValue('');
      }
      if (!this.filterDate) {
        this.defaultDate(
          this.startDate,
          this.endDate,
          this.startDateForm,
          this.endDateForm
        );
        this.selectedMatter = [];
        this.searchMatterForm.setValue('');
        this.descriptionForm.setValue('');
      }
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
    this.filterDate = true;
    this.isOpenFlyout = false;
    this.filterAction.emit({
      startDate: this.startDateForm.value,
      endDate: this.endDateForm.value,
      selectedMatter: this.selectedMatter.map((item) => item.name).join(', '),
      description: this.descriptionForm.value,
      statusFilter: {
        filterDate: this.filterDate,
        filterMatter: this.filterMatter,
        filterTimeDescription: this.descriptionForm.value !== '' ? true : false,
      },
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
    this.filterDate = true;
  }

  /** Observe for endDate changes */
  changeEndDate(event: string): void {
    this.endDateForm.setValue(event);
    this.filterDate = true;
  }

  /** Matter Selection */
  selectionMatter(event: { name: string; value: any }[]): void {
    this.selectedMatter = event;
    if (event.length > 0) {
      this.filterMatter = true;
    } else {
      this.filterMatter = false;
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
    this.defaultDate(
      this.startDate,
      this.endDate,
      this.startDateForm,
      this.endDateForm
    );
    this.selectedMatter = [];
    this.searchMatterForm.setValue('');
    this.descriptionForm.setValue('');
  }

  /** Clear filter but reset ui */
  clearFiltersAll(): void {
    this.clearFilters();
    this.isOpenFlyout = false;
    this.filterDate = false;
    this.filterTimeDescription = false;
    this.filterMatter = false;
    this.clearFilterAll.emit({
      filterDate: this.filterDate,
      filterMatter: this.filterMatter,
      filterTimeDescription: this.filterTimeDescription,
    });
  }
}
