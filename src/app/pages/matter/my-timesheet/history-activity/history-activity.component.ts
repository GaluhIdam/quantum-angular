import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UtilityComponent } from './components/utility/utility.component';
import { ToastComponent } from '@quantum/fui';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../dtos/my-timesheet.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { map } from 'rxjs';
import { ApplyFilterComponent } from './components/apply-filter/apply-filter.component';
import { TableWithoutFilterComponent } from './components/table-without-filter/table-without-filter.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFilterComponent } from './components/table-filter/table-filter.component';

@Component({
  selector: 'app-history-activity',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UtilityComponent,
    ApplyFilterComponent,
    TableWithoutFilterComponent,
    TableFilterComponent,
    ToastComponent,
  ],
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
})
export class HistoryActivityComponent extends BaseController {
  /** Data will input from MyTimesheetComponent */
  @Input() listActivities: ActivityDTO[] = [];
  @Input() listMatters: MatterDTO[] = [];

  dataTimesheet: MyTimesheetDTO[] = [];
  dateTimesheetByDate: TimesheetByDateDTO[] = [];

  /** Date Config */
  currentDate: Date = new Date();
  endDate: Date = new Date();
  startDate: Date = new Date();
  startDateForm: FormControl = new FormControl();
  endDateForm: FormControl = new FormControl();

  /** Status for filter */
  filterDate: boolean = false;
  filterMatter: boolean = false;
  filterTimeDescription: boolean = false;

  /** Data from apply filter */
  startDateFilter: string = '';
  endDateFilter: string = '';
  selectedMatterFilter: string = '';
  descriptionFilter: string = '';

  /** Pagination */
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;

  constructor(private readonly mytimesheetService: MyTimesheetService) {
    super();
    this.startDate.setDate(this.startDate.getDate() - 5);
    this.defaultDate(
      this.startDate,
      this.endDate,
      this.startDateForm,
      this.endDateForm
    );
  }

  ngOnInit(): void {
    this.getTimesheet(this.startDateForm.value, this.endDateForm.value);
  }

  /** Geting timesheet from MyTimesheetService */
  getTimesheet(startDate: string, endDate: string): void {
    this.mytimesheetService
      .getTimesheetWithRange(startDate, endDate)
      .pipe(map((res) => (this.dataTimesheet = res.result)))
      .subscribe();
  }

  /** Filter Timesheet */
  filterTimesheet(
    startDate: string,
    endDate: string,
    matters: string,
    description: string,
    page: number,
    size: number
  ): void {
    this.mytimesheetService
      .getFilterTimesheet(startDate, endDate, matters, description, page, size)
      .pipe(
        map((res) => {
          this.totalItems = res.result.totalElements;
          this.dataTimesheet = res.result.content;
        })
      )
      .subscribe();
  }

  /** Apply Filter */
  applyFilterAction(event: {
    startDate: string;
    endDate: string;
    selectedMatter: string;
    description: string;
    statusFilter: {
      filterDate: boolean;
      filterMatter: boolean;
      filterTimeDescription: boolean;
    };
  }): void {
    this.filterDate = event.statusFilter.filterDate;
    this.filterMatter = event.statusFilter.filterMatter;
    this.filterTimeDescription = event.statusFilter.filterTimeDescription;
    this.startDateFilter = event.startDate;
    this.endDateFilter = event.endDate;
    this.selectedMatterFilter = event.selectedMatter;
    this.descriptionFilter = event.description;

    this.filterTimesheet(
      this.startDateFilter,
      this.endDateFilter,
      this.selectedMatterFilter,
      this.descriptionFilter,
      this.page,
      this.limit
    );
  }

  /** Pagination changes */
  onPageChangeOut(event: { page: number; itemsPerPage: number }): void {
    this.page = event.page;
    this.limit = event.itemsPerPage;
    this.filterTimesheet(
      this.startDateFilter,
      this.endDateFilter,
      this.selectedMatterFilter,
      this.descriptionFilter,
      event.page,
      event.itemsPerPage
    );
  }

  /** Clear filter date */
  clearFilterDate(event: boolean) {
    this.filterDate = event;
  }

  /** Clear filter matter */
  clearFilterMatter(event: boolean) {
    this.filterMatter = event;
  }

  /** Clear filter description */
  clearFilterTimeDescription(event: boolean) {
    this.filterTimeDescription = event;
  }

  /** Clear filter and reset with cancel button */
  clearFilterAll(event: {
    filterDate: boolean;
    filterMatter: boolean;
    filterTimeDescription: boolean;
  }): void {
    this.filterDate = event.filterDate;
    this.filterMatter = event.filterMatter;
    this.filterTimeDescription = event.filterTimeDescription;
  }

  /** Getting data timesheet by date from generate ini utlity component */
  getDataTimesheetByDate(event: TimesheetByDateDTO[]): void {
    this.dateTimesheetByDate = event;
  }

  /** Observe dange when move next or previous */
  dateMoveWatcher(event: { startDate: string; endDate: string }): void {
    this.startDate = new Date(event.startDate);
    this.endDate = new Date(event.endDate);
    this.startDateForm.setValue(event.startDate);
    this.endDateForm.setValue(event.endDate);
    this.getTimesheet(event.startDate, event.endDate);
  }
}
