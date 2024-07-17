import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UtilityComponent } from './utility/utility.component';
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
import { TableWithoutFilterComponent } from './table-without-filter/table-without-filter.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { FilterAplliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { FilterAppliedComponent } from '../../../../shared/filter-applied/filter-applied.component';
import { MoveMatterComponent } from './move-matter/move-matter.component';
import { CreateTimesheetFlyoutComponent } from '../../../../shared/layouts/create-timesheet-flyout/create-timesheet-flyout.component';
import { EditTimesheetFlyoutComponent } from '../../../../shared/layouts/edit-timesheet-flyout/edit-timesheet-flyout.component';
import { EditTagTimesheetFlyoutComponent } from '../../../../shared/layouts/edit-tag-timesheet-flyout/edit-tag-timesheet-flyout.component';
import { ModalDeleteComponent } from '../../../../shared/layouts/modal-delete/modal-delete.component';

@Component({
  selector: 'app-history-activity',
  standalone: true,
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  ],
})
export class HistoryActivityComponent extends BaseController {
  loading: boolean = false;

  /** Data will input from MyTimesheetComponent and will send to :
   * 1. Utility Component (for filter options).
   * 2. Move Matter Component (for matter selection).
   */
  @Input() listMatters: MatterDTO[] = [];

  /** Data will input from service */
  dataTimesheet: MyTimesheetDTO[] = [];

  /** Data will input from utility compnent */
  dateTimesheetByDate: TimesheetByDateDTO[] = [];

  /** Data will input from utility compnent */
  timesheetSelected: MyTimesheetDTO[] = [];

  /** Data will change based on filter applied */
  startDateFilter: string = '';
  endDateFilter: string = '';
  selectedMatterFilter: string = '';
  descriptionFilter: string = '';

  /** Pagination */
  page: number = 1;
  limit: number = 10;
  totalItems: number = 0;

  /** Data input from utility component and send to filter applied component */
  filterApplied: FilterAplliedDTO[] = [];

  /** Varible for create timesheet flyout */
  isOpenCreateFlyout: boolean = false;

  /** Varible for edit timesheet flyout */
  isOpenEditFlyout: boolean = false;

  /** Varible for edit tag timesheet flyout */
  isOpenEditTagFlyout: boolean = false;

  /** Variable for open/close modal delete */
  openModalDelete: boolean = false;

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
      .pipe(map((res) => (this.dataTimesheet = res.result)))
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
        map((res) => {
          this.totalItems = res.result.totalElements;
          this.dataTimesheet = res.result.content;
        })
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

  /** Getting data timesheet by date from generate ini utlity component */
  getDataTimesheetByDate(event: TimesheetByDateDTO[]): void {
    this.dateTimesheetByDate = event;
  }

  /** Observe dange when move next or previous */
  dateMoveWatcher(event: { startDate: string; endDate: string }): void {
    this.getTimesheet(event.startDate, event.endDate);
  }

  /** Checking filter is on or not */
  checkFilter(): boolean {
    return this.filterApplied.some((item) => item.status == true);
  }

  /** Catch changes from utility component for open create timesheet flyout */
  clickOpenCreateFlyout(event: boolean): void {
    this.isOpenCreateFlyout = event;
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

  /** Catch data from table without filter component for open modal delete */
  clickOpenModalDelete(event: { modal: boolean; uuid: string }): void {
    this.openModalDelete = event.modal;
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
}
