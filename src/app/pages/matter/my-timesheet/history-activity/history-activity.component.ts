import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, inject, Input } from '@angular/core';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TextComponent,
  ToastComponent,
} from '@quantum/fui';

import { BaseController } from '../../../../core/controller/basecontroller';
import { TableWithoutFilterComponent } from './table-without-filter/table-without-filter.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { FilterAppliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { FilterAppliedComponent } from '../../../../shared/filter-applied/filter-applied.component';
import { MoveMatterComponent } from '../../../../shared/move-matter/move-matter.component';
import { ModalDeleteComponent } from '../../../../shared/modal-delete/modal-delete.component';
import { TableUtilitySimpleComponent } from './table-utility-simple/table-utility-simple.component';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';
import { FlyoutTimesheetComponent } from '../../../../shared/flyout-timesheet/flyout-timesheet.component';
import {
  ActivityTimesheetDTO,
  MatterTimesheetDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../../../../interfaces/my-timesheet.dto';
import { HistoryActivityService } from '../../../../services/matter/my-timesheet/history-activity/history-activity.service';

@Component({
  selector: 'app-history-activity',
  standalone: true,
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextComponent,
    TableUtilitySimpleComponent,
    FlyoutSimpleComponent,
    ButtonIconComponent,
    DateRangeComponent,
    IconsComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ComboBoxComponent,
    ModalDeleteComponent,
    FilterAppliedComponent,
    MoveMatterComponent,
    TableWithoutFilterComponent,
    TableFilterComponent,
    SkeletonComponent,
    ToastComponent,
    FlyoutTimesheetComponent,
  ],
  providers: [DatePipe],
})
export class HistoryActivityComponent extends BaseController {
  /** Call service */
  private readonly historyActivityService = inject(HistoryActivityService);

  /** Data will input from MyTimesheetComponent */
  @Input({ required: true }) listMatters: MatterTimesheetDTO[] = [];
  @Input({ required: true }) listActivities: ActivityTimesheetDTO[] = [];

  /** Loading Status */
  loading: boolean = true;

  /** Config Utility */
  hourMinute: string = '0h 0m';

  /** Date for without filter */
  endDate: Date = new Date();
  startDate: Date = new Date();

  /** Data will input from service */
  @Input() dataTimesheet: MyTimesheetDTO[] = [];

  /** After gruping by date */
  dateTimesheetByDate: TimesheetByDateDTO[] = [];

  timesheetEditSelected!: MyTimesheetDTO;

  /** Filter Timesheet */
  openFlyoutFilter: boolean = false;
  startDateForm: FormControl = new FormControl();
  endDateForm: FormControl = new FormControl();
  descriptionForm: FormControl = new FormControl('');
  searchMatterForm: FormControl = new FormControl('');
  optionMatter: { name: string; value: any }[] = [];
  selectedMatter: { name: string; value: any }[] = [];

  /** Pagination for table filter */
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;

  /** Data will input from utility compnent */
  timesheetSelected: MyTimesheetDTO[] = [];

  /** Data input from utility component and send to filter applied component */
  filterApplied: FilterAppliedDTO[] = [];

  /** Variable for create timesheet flyout */
  isOpenCreateFlyout: boolean = false;

  /** Variable for edit timesheet flyout */
  isOpenEditFlyout: boolean = false;

  /** Variable for edit tag timesheet flyout */
  isOpenEditTagFlyout: boolean = false;

  /** Variable for modal delete */
  isModalDelete: boolean = false;

  constructor(private datePipe: DatePipe) {
    super();
    /** Replace start date and end date */
    this.startDate = new Date(this.defaultDate().startDateForm);
    this.endDate = new Date(this.defaultDate().endDateForm);
  }

  ngOnInit(): void {
    this.moveDate(0);
    this.getTimesheetByDate(this.startDateForm.value, this.endDateForm.value);
  }

  ngOnChanges(): void {
    this.dataTransform();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.openFlyoutFilter = false;
  }

  /** Getting timssheet by date range */
  getTimesheetByDate(startDate: string, endDate: string): void {
    const startDateObj = startDate.split('-').reverse().join('-');
    const endDateObj = endDate.split('-').reverse().join('-');
    this.startDate = new Date(startDateObj);
    this.endDate = new Date(endDateObj);
    this.historyActivityService
      .getTimesheetByDateRange(startDateObj, endDateObj)
      .subscribe({
        next: (value) => {
          this.groupingData(value.result, startDateObj, endDateObj);
        },
        error: (error) => {
          this.errorToast(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  /** Getting timesheet by filter */
  getTimesheetFilter(
    startDate: string,
    endDate: string,
    matters: string,
    addDescription: string,
    page: number,
    limit: number
  ): void {
    this.filterApplied = [];

    // Correctly parse the date strings from "DD-MM-YYYY" to "YYYY-MM-DD"
    const startDateObj = startDate.split('-').reverse().join('-');
    const endDateObj = endDate.split('-').reverse().join('-');

    this.startDate = new Date(startDateObj);
    this.endDate = new Date(endDateObj);

    // Check if dates are valid
    if (!isNaN(this.startDate.getTime()) && !isNaN(this.endDate.getTime())) {
      this.filterApplied.push({
        name: 'Date',
        status: true,
      });
    }

    if (matters !== '' && matters !== null) {
      this.filterApplied.push({
        name: 'Matter',
        status: true,
      });
    }
    if (addDescription !== '' && addDescription !== null) {
      this.filterApplied.push({
        name: 'Time Description',
        status: true,
      });
    }
    this.historyActivityService
      .getFilterTimesheet(
        startDate === ''
          ? null
          : this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!.toString(), // Adjust format to 'yyyy-MM-dd'
        endDate === ''
          ? null
          : this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!.toString(), // Adjust format to 'yyyy-MM-dd'
        matters === '' ? null : matters,
        addDescription === '' ? null : addDescription,
        page,
        limit
      )
      .subscribe({
        next: (value) => {
          this.dataTimesheet = value.result.data;
          this.page = value.result.page;
          this.limit = value.result.limit;
          this.totalItems = value.result.totalItems;
        },
        error: (error) => {
          this.errorToast(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  /** Pagination changes */
  onPageChangeOut(event: { page: number; itemsPerPage: number }): void {
    this.filterApplied = [];
    /** Repelace page & limit */
    this.page = event.page;
    this.limit = event.itemsPerPage;

    this.getTimesheetFilter(
      this.startDateForm.value,
      this.endDateForm.value,
      this.getNamesAsString(this.selectedMatter),
      this.descriptionForm.value,
      event.page,
      event.itemsPerPage
    );
  }

  /** Cancel Fiter */
  cancelFilter(): void {
    this.openFlyoutFilter = false;
    this.resetFilter();
  }

  /** Reset form filter */
  resetFilter(): void {
    this.startDateForm = new FormControl(
      `${this.datePipe.transform(
        this.defaultDate().startDateForm,
        'dd-MM-yyyy'
      )}`
    );
    this.endDateForm = new FormControl(
      this.datePipe.transform(this.defaultDate().endDateForm, 'dd-MM-yyyy')
    );
    this.searchMatterForm.setValue('');
    this.selectedMatter = [];
    this.descriptionForm.reset();
  }

  /** Action for apply filter */
  actionFilter(event: any): void {
    this.getTimesheetFilter(
      this.startDateForm.value,
      this.endDateForm.value,
      this.getNamesAsString(this.selectedMatter),
      this.descriptionForm.value,
      this.page,
      this.limit
    );
    this.openFlyoutFilter = false;
  }

  /** Transform data matters to be options */
  dataTransform(): void {
    this.listMatters.forEach((item) => {
      this.optionMatter.push({
        name: item.matter,
        value: item.idMatter,
      });
    });
  }

  /** Catch Btn Action Util */
  btnActionUtil(event: string | number): void {
    if (event === 'next') {
      this.moveDate(5);
      this.getTimesheetByDate(this.startDateForm.value, this.endDateForm.value);
    }
    if (event === 'prev') {
      this.moveDate(-5);
      this.getTimesheetByDate(this.startDateForm.value, this.endDateForm.value);
    }
    if (event === 'filter') {
      this.closeOutFilter(true);
    }
    if (event === 'add') {
      this.isOpenCreateFlyout = true;
    }
  }

  /** Move Date Next/Prev */
  moveDate(day: number): void {
    const newDate = new Date(this.endDate);
    newDate.setDate(newDate.getDate() + day);
    this.endDate = newDate;
    this.startDate = new Date(this.endDate);
    this.startDate.setDate(this.endDate.getDate() - 5);
    const startDate = this.formatDate(this.startDate);
    const endDate = this.formatDate(this.endDate);

    /** Set form start date - end date */
    this.startDateForm.setValue(
      this.datePipe.transform(startDate, 'dd-MM-yyyy')
    );
    this.endDateForm.setValue(this.datePipe.transform(endDate, 'dd-MM-yyyy'));
  }

  /** Grouping and get total hours */
  groupingData(
    data: MyTimesheetDTO[],
    startDate: string,
    endDate: string
  ): void {
    this.hourMinute = this.calculateTotalDuration(data);
    /** Grrouping process */
    this.dateTimesheetByDate = this.groupingTimesheetByRangeDate(
      data,
      startDate,
      endDate
    );
  }

  /** Catch changes from Create Timesheet Component */
  closeOutCreate(event: boolean): void {
    this.isOpenCreateFlyout = event;
  }
  /** Toggle Open/Close Flyout Filter */
  closeOutFilter(event: boolean): void {
    this.openFlyoutFilter = event;
  }

  /** Observe for startDate changes */
  changeDateForm(event: string, param: 'start' | 'end'): void {
    if (param === 'start') {
      this.startDateForm.setValue(event);
    }
    if (param === 'end') {
      this.endDateForm.setValue(event);
    }
  }

  /** Invalid if start date less last date */
  invalidStartEndDate(): boolean {
    const [startDay, startMonth, startYear] =
      this.startDateForm.value.split('-');
    const [endDay, endMonth, endYear] = this.endDateForm.value.split('-');
    const startDate = new Date(+startYear, +startMonth - 1, +startDay);
    const endDate = new Date(+endYear, +endMonth - 1, +endDay);
    return startDate >= endDate;
  }

  /** Matter Selection */
  selectionMatter(event: { name: string; value: any }[]): void {
    this.selectedMatter = event;
  }

  /** Action for move timesheet */
  actionMoveTimesheet(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
  }

  /** Catch action from table */
  actionTableFilter(event: {
    action: string;
    flyout: boolean;
    data: MyTimesheetDTO;
  }): void {
    this.timesheetEditSelected = event.data;
    if (event.action === 'edit') {
      this.isOpenEditFlyout = event.flyout;
    }
    if (event.action === 'edit-tag') {
      this.isOpenEditTagFlyout = event.flyout;
    }
    if (event.action === 'delete') {
      this.isModalDelete = event.flyout;
    }
  }

  /** Catch data from table without filter component for get data timesheet selected
   * then will send to service and move matter component */
  timesheetSelectedOut(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
  }

  /** Catch changes from edit timesheet flyout component */
  closeOutEdit(event: boolean): void {
    this.isOpenEditFlyout = false;
  }
  /** Catch changes from edit tag timesheet flyout component */

  closeOutEditTag(event: boolean): void {
    this.isOpenEditTagFlyout = event;
  }

  /** Clear all filter */
  clearAllFilterOut(event: FilterAppliedDTO[]): void {
    this.filterApplied = event;
  }

  /** Checking filter is on or not */
  checkFilter(): boolean {
    return this.filterApplied.some((item) => item.status == true);
  }

  /** Catch action from modal delete */
  actionModal(event: { name: string; status: boolean }): void {
    if (event.name === 'cancel') {
      this.isModalDelete = event.status;
    }
    if (event.name === 'delete') {
      this.isModalDelete = event.status;
    }
  }
}
