import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UtilityComponent } from './utility/utility.component';
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
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../dtos/my-timesheet.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { TableWithoutFilterComponent } from './table-without-filter/table-without-filter.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { FilterAplliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { FilterAppliedComponent } from '../../../../shared/filter-applied/filter-applied.component';
import { MoveMatterComponent } from './move-matter/move-matter.component';
import { CreateTimesheetFlyoutComponent } from '../../../../shared/create-timesheet-flyout/create-timesheet-flyout.component';
import { EditTimesheetFlyoutComponent } from '../../../../shared/edit-timesheet-flyout/edit-timesheet-flyout.component';
import { EditTagTimesheetFlyoutComponent } from '../../../../shared/edit-tag-timesheet-flyout/edit-tag-timesheet-flyout.component';
import { ModalDeleteComponent } from '../../../../shared/modal-delete/modal-delete.component';
import { TableUtilitySimpleComponent } from '../../../../shared/table-utility-simple/table-utility-simple.component';
import {
  leftAfterUtilBtn,
  leftBeforeUtilBtn,
  rightBeforeBtnUtil,
} from '../data/data';
import { BadgeUtilDTO } from '../../../../shared/table-utility-simple/dto/table-utility.dto';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-history-activity',
  standalone: true,
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
  imports: [
    UtilityComponent,
    TableWithoutFilterComponent,
    TableFilterComponent,
    ToastComponent,
    SkeletonComponent,
    FilterAppliedComponent,
    MoveMatterComponent,
    CreateTimesheetFlyoutComponent,
    EditTimesheetFlyoutComponent,
    EditTagTimesheetFlyoutComponent,

    //-----------
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  ],
})
export class HistoryActivityComponent extends BaseController {
  /** Data will input from MyTimesheetComponent */
  @Input({ required: true }) listMatters: MatterDTO[] = [];
  @Input({ required: true }) listActivities: ActivityDTO[] = [];

  /** Getting from service */
  // listTimesheets: MyTimesheetDTO[] = [];

  /** Loading Status */
  loading: boolean = false;

  /** Config Utility */
  readonly leftBeforeUtilBtn = leftBeforeUtilBtn;
  readonly leftAfterUtilBtn = leftAfterUtilBtn;
  leftAfterUtilBadge: BadgeUtilDTO[] = [];
  readonly rightBeforeBtnUtil = rightBeforeBtnUtil;
  hourMinute: string = '0h 0m';
  readonly leftUtilBadge: BadgeUtilDTO[] = [
    {
      text: this.hourMinute,
      color: 'ghost',
      size: 'sizem',
      sizeIcon: 'sizes',
      isBadgeIcon: true,
      iconPosition: 'start',
      icon: 'clock',
      underline: false,
      rounded: false,
    },
  ];

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

  //____________________________________________________________________________

  /** Data will input from utility compnent */
  timesheetSelected: MyTimesheetDTO[] = [];

  /** Data input from utility component and send to filter applied component */
  filterApplied: FilterAplliedDTO[] = [];

  /** Variable for create timesheet flyout */
  isOpenCreateFlyout: boolean = false;

  /** Variable for edit timesheet flyout */
  isOpenEditFlyout: boolean = false;

  /** Variable for edit tag timesheet flyout */
  isOpenEditTagFlyout: boolean = false;

  /** Variable for modal delete */
  isModalDelete: boolean = false;

  constructor(private readonly mytimesheetService: MyTimesheetService) {
    super();
    /** Replace start date and end date */
    this.startDate = new Date(this.defaultDate().startDateForm);
    this.endDate = new Date(this.defaultDate().endDateForm);

    /** Replace start date form and end date form in filter flyout */
    this.startDateForm.setValue(this.defaultDate().startDateForm);
    this.endDateForm.setValue(this.defaultDate().endDateForm);
  }

  ngOnInit(): void {
    this.moveDate(0);
    this.getTimesheetByDate(this.startDateForm.value, this.endDateForm.value);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnChanges(): void {
    this.dataTransform();
  }

  /** Getting timssheet by date range */
  getTimesheetByDate(startDate: string, endDate: string): void {
    this.mytimesheetService
      .getTimesheetWithRange(startDate, endDate)
      .pipe(
        map((data) => {
          this.groupingData(data, startDate, endDate);
        })
      )
      .subscribe();
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
    if (startDate !== '' && endDate !== '') {
      this.filterApplied.push({
        name: 'Date',
        status: true,
      });
    }
    if (matters !== '') {
      this.filterApplied.push({
        name: 'Matter',
        status: true,
      });
    }
    if (addDescription !== '') {
      this.filterApplied.push({
        name: 'Time Description',
        status: true,
      });
    }

    this.mytimesheetService
      .getFilterTimesheet(
        startDate === '' ? null : startDate,
        endDate === '' ? null : endDate,
        matters === '' ? null : matters,
        addDescription === '' ? null : addDescription,
        page,
        limit
      )
      .pipe(
        map((data) => {
          this.dataTimesheet = data.data; // Adjust according to the response structure
          this.page = data.page;
          this.limit = data.limit;
          this.totalItems = data.totalItems;
        })
      )
      .subscribe({
        error: (err) => {
          console.error('Error fetching timesheets:', err);
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
    this.startDateForm.setValue(startDate);
    this.endDateForm.setValue(endDate);
  }

  /** Grouping and get total hours */
  groupingData(
    data: MyTimesheetDTO[],
    startDate: string,
    endDate: string
  ): void {
    this.leftAfterUtilBadge = [
      {
        text: this.calculateTotalDuration(data),
        color: 'ghost',
        size: 'sizem',
        sizeIcon: 'sizes',
        isBadgeIcon: true,
        iconPosition: 'start',
        icon: 'clock',
        underline: false,
        rounded: false,
      },
    ];
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
  /** Matter Selection */
  selectionMatter(event: { name: string; value: any }[]): void {
    this.selectedMatter = event;
    // if (event.length > 0) {
    //   this.enableFilter('Matter', true);
    // } else {
    //   this.enableFilter('Matter', false);
    // }
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
    this.isOpenEditFlyout = event;
  }
  /** Catch changes from edit tag timesheet flyout component */
  closeOutEditTag(event: boolean): void {
    this.isOpenEditTagFlyout = event;
  }

  /** Clear all filter */
  clearAllFilterOut(event: FilterAplliedDTO[]): void {
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
