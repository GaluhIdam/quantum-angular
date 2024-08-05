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
  MatterDTO,
  MyTimesheetDTO,
  TimesheetByDateDTO,
} from '../dtos/my-timesheet.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { map } from 'rxjs';
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
  leftAfterUtilBadge,
  rightBeforeBtnUtil,
} from '../data/data';
import { BadgeUtilDTO } from '../../../../shared/table-utility-simple/dto/table-utility.dto';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';

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
    ModalDeleteComponent,

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
  ],
})
export class HistoryActivityComponent extends BaseController {
  /** Loading Status */
  loading: boolean = false;

  /** Config Utility */
  readonly leftBeforeUtilBtn = leftBeforeUtilBtn;
  readonly leftAfterUtilBtn = leftAfterUtilBtn;
  readonly leftAfterUtilBadge = leftAfterUtilBadge;
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

  /** Filter Timesheet */
  openFlyoutFilter: boolean = false;
  startDateForm: FormControl = new FormControl();
  endDateForm: FormControl = new FormControl();
  descriptionForm: FormControl = new FormControl('');
  searchMatterForm: FormControl = new FormControl('');
  optionMatter: { name: string; value: any }[] = [];
  selectedMatter: { name: string; value: any }[] = [];

  /** Data will input from MyTimesheetComponent */
  @Input() listMatters: MatterDTO[] = [];

  /** Pagination for table filter */
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;

  //____________________________________________________________________________

  /** Data will input from utility compnent */
  timesheetSelected: MyTimesheetDTO[] = [];

  /** Data input from utility component and send to filter applied component */
  filterApplied: FilterAplliedDTO[] = [];

  /** Varible for create timesheet flyout */
  isOpenCreateFlyout: boolean = false;

  /** Varible for edit timesheet flyout */
  isOpenEditFlyout: boolean = false;

  /** Varible for edit tag timesheet flyout */
  isOpenEditTagFlyout: boolean = false;


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
    this.filterApplied = this.mytimesheetService.dataFilterMyTimesheet();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.moveDate(0, this.dataTimesheet);
  }

  /** Clear all filter */
  clearAllFilterOut(event: FilterAplliedDTO[]): void {
    this.filterApplied = event;
  }

  /** Pagination changes */
  onPageChangeOut(event: { page: number; itemsPerPage: number }): void {
    /** Rpelace page & limit */
    this.page = event.page;
    this.limit = event.itemsPerPage;
  }

  /** Getting data timesheet by date from generate ini utlity component */
  getDataTimesheetByDate(event: TimesheetByDateDTO[]): void {
    this.dateTimesheetByDate = event;
  }

  /** Checking filter is on or not */
  checkFilter(): boolean {
    return this.filterApplied.some((item) => item.status == true);
  }

  /** Catch data from table without filter component for get data timesheet selected
   * then will send to service and move matter component */
  timesheetSelectedOut(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
  }

  /** Clear timesheet selected */
  clearSelectionOut(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
  }

  /** Catch data from table without filter component for open edit flyout */
  clickOpenEdit(event: { flyout: boolean; data: MyTimesheetDTO }): void {
    this.isOpenEditFlyout = event.flyout;
  }

  /** Catch data from table without filter component for open edit tag flyout */
  clickOpenEditTag(event: { flyout: boolean; data: MyTimesheetDTO }): void {
    this.isOpenEditTagFlyout = event.flyout;
  }

  /** Catch changes from edit timesheet flyout component */
  closeOutEdit(event: boolean): void {
    this.isOpenEditFlyout = event;
  }

  //______________________________________________________________________

  /** Catch Btn Action Util */
  btnActionUtil(event: string | number): void {
    if (event === 'next') {
      this.moveDate(5, this.dataTimesheet);
    }
    if (event === 'prev') {
      this.moveDate(-5, this.dataTimesheet);
    }
    if (event === 'filter') {
      this.closeOutFilter(true);
    }
    if (event === 'add') {
      this.isOpenCreateFlyout = true;
    }
  }

  /** Move Date Next/Prev */
  moveDate(day: number, data: MyTimesheetDTO[]): void {
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
}
