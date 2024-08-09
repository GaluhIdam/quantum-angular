import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonIconComponent,
  FilterGroupButtonComponent,
  FilterGroupComponent,
  Icon,
  IconsComponent,
  Size,
  TabsComponent,
  TabsContentComponent,
  TextComponent,
} from '@quantum/fui';
import { HistoryActivityComponent } from '../../my-timesheet/history-activity/history-activity.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FilterAppliedComponent } from '../../../../shared/filter-applied/filter-applied.component';
import { FilterAplliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { BaseController } from '../../../../core/controller/basecontroller';
import { FormControl } from '@angular/forms';
import {
  MatterDTO,
  MyTimesheetDTO,
} from '../../my-timesheet/dtos/my-timesheet.dto';
import { MoveMatterComponent } from '../../../../shared/move-matter/move-matter.component';
import { MyTimesheetService } from '../../my-timesheet/services/my-timesheet.service';
import { CreateTimesheetFlyoutComponent } from '../../../../shared/create-timesheet-flyout/create-timesheet-flyout.component';
import { EditTagTimesheetFlyoutComponent } from '../../../../shared/edit-tag-timesheet-flyout/edit-tag-timesheet-flyout.component';
import { ModalDeleteComponent } from '../../../../shared/modal-delete/modal-delete.component';
import { UtilityDetailMatterComponent } from './utility-detail-matter/utility-detail-matter.component';
import { TableDetailMatterComponent } from './table-detail-matter/table-detail-matter.component';
import { EditTimesheetFlyoutComponent } from '../../../../shared/edit-timesheet-flyout/edit-timesheet-flyout.component';

@Component({
  selector: 'app-detail-matter',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonIconComponent,
    TabsComponent,
    TabsContentComponent,
    IconsComponent,
    HistoryActivityComponent,
    ExpensesComponent,
    FilterAppliedComponent,
    MoveMatterComponent,
    TableDetailMatterComponent,
    CreateTimesheetFlyoutComponent,
    EditTimesheetFlyoutComponent,
    EditTagTimesheetFlyoutComponent,
    ModalDeleteComponent,
    TextComponent,
    UtilityDetailMatterComponent,
    FilterGroupButtonComponent,
    FilterGroupComponent,
  ],
  templateUrl: './detail-matter.component.html',
  styleUrl: './detail-matter.component.scss',
})
export class DetailMatterComponent extends BaseController {
  loading: boolean = false;

  /** Data will input from MyTimesheetComponent and will send to :
   * 1. Utility Component (for filter options).
   * 2. Move Matter Component (for matter selection).
   */
  @Input() listMatters: MatterDTO[] = [];

  /** Data will input from service */
  dataTimesheet: MyTimesheetDTO[] = [];

  /** Data input from utility component and send to filter applied component */
  filterApplied: FilterAplliedDTO[] = [];

  /** Data will input from utility compnent */
  timesheetSelected: MyTimesheetDTO[] = [];

  /** Varible for create timesheet flyout */
  isOpenCreateFlyout: boolean = false;

  /** Varible for edit timesheet flyout */
  isOpenEditFlyout: boolean = false;

  /** Varible for edit tag timesheet flyout */
  isOpenEditTagFlyout: boolean = false;

  /** Variable for open/close modal delete */
  openModalDelete: boolean = false;

  /** Date Config */
  currentDate: Date = new Date();
  endDate: Date = new Date();
  startDate: Date = new Date();
  startDateForm: FormControl = new FormControl();
  endDateForm: FormControl = new FormControl();

  /** Data from apply filter */
  startDateFilter: string = '';
  endDateFilter: string = '';
  selectedMatterFilter: string = '';
  descriptionFilter: string = '';
  uncolleted: boolean = false;

  /** Pagination */
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;

  dataTabs: {
    active: boolean | 'disabled';
    icon?: Icon;
    sideIcon?: 'right' | 'left';
    sizeIcon?: Size;
    prepend?: string;
    append?: string;
    title: string;
  }[] = [
    {
      active: 'disabled',
      icon: 'visArea',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Overview',
    },
    {
      active: 'disabled',
      icon: 'document',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Information',
    },
    {
      active: true,
      icon: 'clock',
      sideIcon: 'left',
      sizeIcon: 'sizel',
      title: 'Timesheet',
    },
    {
      active: false,
      icon: 'tag',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Expenses',
    },
    {
      active: 'disabled',
      icon: 'folderOpen',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Documents',
    },
  ];

  constructor(private readonly mytimesheetService: MyTimesheetService) {
    super();
    /** Initialize start to end date */
    this.startDateFilter = this.defaultDate().startDateForm;
    this.endDateFilter = this.defaultDate().endDateForm;
  }

  ngOnInit(): void {
    this.filterApplied = this.mytimesheetService.dataFilterMyTimesheet();
    this.getTimesheet(this.startDateFilter, this.endDateFilter);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  /** Geting timesheet from MyTimesheetService */
  getTimesheet(startDate: string, endDate: string): void {
    this.mytimesheetService
      .getTimesheetWithRange(startDate, endDate)
      // .pipe(map((res) => (this.dataTimesheet = res.result)))
      .subscribe();
  }

  /** Filter timesheet to MyTimesheetService */
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
        // map((res) => {
        //   this.totalItems = res.result.totalElements;
        //   this.dataTimesheet = res.result.content;
        // })
      )
      .subscribe();
  }

  /** Apply Filter and recall data from service */
  applyFilterAction(event: {
    startDate: string;
    endDate: string;
    selectedMatter: string;
    description: string;
    filterApplied: FilterAplliedDTO[];
  }): void {
    /** Replace filter */
    this.filterApplied = event.filterApplied;
    this.startDateFilter = event.startDate;
    this.endDateFilter = event.endDate;
    this.selectedMatterFilter = event.selectedMatter;
    this.descriptionFilter = event.description;

    /** Recall data */
    this.filterTimesheet(
      this.startDateFilter,
      this.endDateFilter,
      this.selectedMatterFilter,
      this.descriptionFilter,
      this.page,
      this.limit
    );
  }

  /** Clear all filter */
  clearAllFilterOut(event: FilterAplliedDTO[]): void {
    this.filterApplied = event;
  }

  /** Catch changes from utility component for open create timesheet flyout */
  clickOpenCreateFlyout(event: boolean): void {
    this.isOpenCreateFlyout = event;
  }

  /** Clear timesheet selected */
  clearSelectionOut(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
  }

  /** Pagination changes */
  onPageChangeOut(event: { page: number; itemsPerPage: number }): void {
    /** Rpelace page & limit */
    this.page = event.page;
    this.limit = event.itemsPerPage;

    /** Recall data */
    this.filterTimesheet(
      this.startDateFilter,
      this.endDateFilter,
      this.selectedMatterFilter,
      this.descriptionFilter,
      event.page,
      event.itemsPerPage
    );
  }

  /** Catch data from table without filter component for get data timesheet selected
   * then will send to service and move matter component */
  timesheetSelectedOut(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
  }

  /** Catch changes from Create Timesheet Component */
  closeOutCreate(event: boolean): void {
    this.isOpenCreateFlyout = event;
  }

  /** Catch changes from edit timesheet flyout component */
  closeOutEdit(event: boolean): void {
    this.isOpenEditFlyout = event;
  }

  /** Catch changes from edit tag timesheet flyout component*/
  closeOutEditTag(event: boolean): void {
    this.isOpenEditTagFlyout = event;
  }

  /** Catch changes from modal delete component */
  cancelOutDelete(event: boolean): void {
    this.openModalDelete = event;
  }

  /** Catch changes from modal delete component */
  deleteActionOutDelete(event: boolean): void {
    this.openModalDelete = event;
  }

  /** Toggle for filter colleted/uncollected */
  toggleFilter(param: boolean): void {
    this.uncolleted = param;
  }
}
