import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { FilterAppliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { FilterAppliedComponent } from '../../../../shared/filter-applied/filter-applied.component';
import { MoveMatterComponent } from '../../../../shared/move-matter/move-matter.component';
import { ModalDeleteComponent } from '../../../../shared/modal-delete/modal-delete.component';
import { TableUtilitySimpleComponent } from './table-utility-simple/table-utility-simple.component';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';
import { FlyoutTimesheetComponent } from '../../../../shared/flyout-timesheet/flyout-timesheet.component';
import { MatterService } from '../../../../services/matter/matter.service';
import { ActivityService } from '../../../../services/activity/activity.service';
import { MatterDTO } from '../../../../interfaces/matter.dto';
import { ActivityDTO } from '../../../../interfaces/activity.dto';
import { MyTimesheetDTO } from '../../../../interfaces/my-timesheet.dto';
import { MyTimesheetService } from '../../../../services/my-timesheet/my-timesheet.service';
import { TableFilterComponent } from './table-filter/table-filter.component';

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
    SkeletonComponent,
    ToastComponent,
    FlyoutTimesheetComponent,
    TableFilterComponent,
  ],
  providers: [DatePipe],
})
export class HistoryActivityComponent extends BaseController {
  /** Loading Status */
  loading: boolean = false;

  /** Variable for flyout and modal */
  isOpenCreateFlyout: boolean = false;
  isOpenEditFlyout: boolean = false;
  isOpenEditTagFlyout: boolean = false;
  isModalDelete: boolean = false;

  /** Data matters from service */
  dataMatters: MatterDTO[] = [];

  /** Data activities from service */
  dataActivities: ActivityDTO[] = [];

  /** Data timesheets from service */
  dataTimesheet: MyTimesheetDTO[] = [];

  /** Date range for my timesheet */
  currentDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();

  /** Timesheet Selected */
  timesheetSelected: MyTimesheetDTO[] = [];

  /** Filter data if applied */
  filterApplied: FilterAppliedDTO[] = [];

  /** Timesheet for edit */
  timesheetEditSelected!: MyTimesheetDTO;

  /** Filter Timesheet */
  isOpenFilterFlyout: boolean = false;
  startDateForm: FormControl = new FormControl();
  endDateForm: FormControl = new FormControl();
  searchMatterForm: FormControl = new FormControl('');
  selectedMatter: { name: string; value: any }[] = [];
  descriptionForm: FormControl = new FormControl('');

  /** Pagination for table filter */
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;

  constructor(
    private readonly myTimesheetService: MyTimesheetService,
    private readonly matterService: MatterService,
    private readonly activityService: ActivityService
  ) {
    super();
    /** Replace start date and end date */
    this.startDate.setDate(
      this.currentDate.getDate() - ((this.currentDate.getDay() + 6) % 7)
    );
    this.endDate.setDate(this.startDate.getDate() + 6);
    this.startDateForm = new FormControl(
      formatDate(this.startDate, 'dd-MM-yyyy', 'en')
    );
    this.endDateForm = new FormControl(
      formatDate(this.endDate, 'dd-MM-yyyy', 'en')
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.isOpenFilterFlyout = false;
  }

  /** Toggle utility for prev, next, filter, and add timesheet */
  toggleUtility(
    event: 'next' | 'prev' | 'filter' | 'add' | 'edit' | 'editTag' | 'delete'
  ): void {
    if (event === 'add') {
      this.isOpenCreateFlyout = !this.isOpenCreateFlyout;
    }
    if (event === 'filter') {
      this.isOpenFilterFlyout = !this.isOpenFilterFlyout;
    }
    if (event === 'edit') {
      this.isOpenEditFlyout = !this.isOpenEditFlyout;
    }
    if (event === 'delete') {
      this.isModalDelete = !this.isModalDelete;
    }
    if (event === 'editTag') {
      this.isOpenEditTagFlyout = !this.isOpenEditTagFlyout;
    }
    if (event === 'next' || event === 'prev') {
      this.togglePrevNextWeek(event);
    }
  }

  /** Toggle filter */
  toggleFilter(): void {
    this.filterApplied = [];
    if (
      !this.validatorStartEndFilter(
        this.startDateForm.value,
        this.endDateForm.value
      ) &&
      (this.startDateForm.value !==
        formatDate(this.startDate, 'dd-MM-yyyy', 'en') ||
        this.endDateForm.value !== formatDate(this.endDate, 'dd-MM-yyyy', 'en'))
    ) {
      this.filterApplied.push({
        name: 'Date',
        status: true,
      });
    }
    if (this.descriptionForm.value !== '') {
      this.filterApplied.push({
        name: 'Time Description',
        status: true,
      });
    }

    if (this.selectedMatter.length > 0) {
      this.filterApplied.push({
        name: 'Matter',
        status: true,
      });
    }
    this.toggleUtility('filter');
  }

  /** Toggle clear filter */
  toggleClearFilter(event?: FilterAppliedDTO[]): void {
    if (event) {
      this.filterApplied = event;
      if (event.length === 0) {
        this.timesheetSelected = [];
      }
    }
    this.searchMatterForm = new FormControl('');
    this.selectedMatter = [];
    this.descriptionForm = new FormControl('');

    this.startDate.setDate(
      this.currentDate.getDate() - ((this.currentDate.getDay() + 6) % 7)
    );
    this.endDate.setDate(this.startDate.getDate() + 6);

    this.startDateForm = new FormControl(
      formatDate(this.startDate, 'dd-MM-yyyy', 'en')
    );
    this.endDateForm = new FormControl(
      formatDate(this.endDate, 'dd-MM-yyyy', 'en')
    );
  }

  /** Move timesheet to service */
  moveTimesheet(event: MatterDTO | null): void {
    console.log(event);
  }

  /** Toggle Selection */
  toggleSelection(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
  }

  /** Toggle Edit Delete My Timesheet */
  toggleEditDeleteTimesheet(
    action: 'edit' | 'editTag' | 'delete',
    data: MyTimesheetDTO
  ): void {
    if (action === 'edit' || 'editTag') {
      this.timesheetEditSelected = data;
    }
    this.toggleUtility(action);
  }

  /** Toggle modal for delete or cancel */
  toggleCancelDeleteTimesheet(event: { name: string; status: boolean }): void {
    this.isModalDelete = event.status;
  }

  /** Watch changes of date range */
  watchDateChange(type: 'start' | 'end', value: string): void {
    if (type === 'start') {
      this.startDateForm = new FormControl(value);
    } else {
      this.endDateForm = new FormControl(value);
    }
  }

  /** Validator start date & end date for filter */
  validatorStartEndFilter(start: string, end: string): boolean {
    let startDateObj = new Date(start.split('-').reverse().join('-'));
    let endDateObj = new Date(end.split('-').reverse().join('-'));
    if (startDateObj < endDateObj) {
      return false;
    } else {
      return true;
    }
  }

  /** Toggle for prev or next week */
  togglePrevNextWeek(param: 'prev' | 'next' | 'filter' | 'add'): void {
    if (param === 'prev') {
      this.startDate = new Date(
        this.startDate.setDate(this.startDate.getDate() - 7)
      );
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() - 7));
    }
    if (param === 'next') {
      this.startDate = new Date(
        this.startDate.setDate(this.startDate.getDate() + 7)
      );
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() + 7));
    }
  }

  /**
   * Get data timesheet from services
   * @service
   * MyTimesheetService
   */
  getDataMyTimesheet(startDate: string, endDate: string): void {
    this.myTimesheetService.getMyTimesheetByDate(startDate, endDate).subscribe({
      next: (res) => {
        this.dataTimesheet = res;
      },
    });
  }

  /**
   * Get data matter from services
   * @service
   * MatterService
   */
  getDataMatters(search: string): void {
    this.matterService.getMatters(search).subscribe({
      next: (res) => {
        this.dataMatters = res.data;
        this.converterMatterOpt();
      },
    });
  }

  /**
   * Get data activities from services
   * @service
   * ActivityService
   */
  getDataActivities(search: string): void {
    this.activityService.getActivities(search).subscribe({
      next: (res) => {
        this.dataActivities = res.data;
        this.converterActivityOpt();
      },
    });
  }

  /** Converter data for list activity */
  converterActivityOpt(): {
    name: string;
    value: any;
  }[] {
    const data: {
      name: string;
      value: any;
    }[] = [];
    this.dataActivities.forEach((item) => {
      return data.push({
        name: item.name,
        value: item.name,
      });
    });
    return data;
  }

  /** Converter data for list activity */
  converterMatterOpt(): {
    name: string;
    value: any;
  }[] {
    const data: {
      name: string;
      value: any;
    }[] = [];
    this.dataMatters.forEach((item) => {
      return data.push({
        name: item.matter,
        value: item.matter,
      });
    });
    return data;
  }
}
