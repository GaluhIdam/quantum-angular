import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonIconComponent,
  Icon,
  IconsComponent,
  Size,
  TabsComponent,
  TabsContentComponent,
} from '@quantum/fui';
import { HistoryActivityComponent } from '../../my-timesheet/history-activity/history-activity.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { CreateTimesheetComponent } from './timesheet/create-timesheet/create-timesheet.component';
import { TableTimesheetComponent } from './timesheet/table-timesheet/table-timesheet.component';
import { FilterAppliedComponent } from '../../../../shared/filter-applied/filter-applied.component';
import { FilterAplliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { UtilityComponent } from './timesheet/utility/utility.component';
import { BaseController } from '../../../../core/controller/basecontroller';
import { MyMatterService } from '../services/my-matter.service';
import { FormControl } from '@angular/forms';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
} from '../../my-timesheet/dtos/my-timesheet.dto';
import { MoveMatterComponent } from '../../my-timesheet/history-activity/move-matter/move-matter.component';
import { MyTimesheetService } from '../../my-timesheet/services/my-timesheet.service';
import { map, Subscription } from 'rxjs';

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
    CreateTimesheetComponent,
    TableTimesheetComponent,
    UtilityComponent,
    FilterAppliedComponent,
    MoveMatterComponent,
  ],
  templateUrl: './detail-matter.component.html',
  styleUrl: './detail-matter.component.scss',
})
export class DetailMatterComponent extends BaseController {
  /** Data will input from MyMatterComponent */
  @Input() listActivities: ActivityDTO[] = [];
  @Input() listMatters: MatterDTO[] = [];

  /** Filter Applied */
  filterApplied: FilterAplliedDTO[] = [];
  dataTimesheet: MyTimesheetDTO[] = [];
  timesheetSelected: MyTimesheetDTO[] = [];

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

  mattersData: MatterDTO[] = [];
  activitesData: ActivityDTO[] = [];

  subscription!: Subscription;

  constructor(
    private readonly myMatterService: MyMatterService,
    private readonly myTimesheetService: MyTimesheetService
  ) {
    super();
    this.startDate.setDate(this.startDate.getDate() - 5);
    this.startDateForm.setValue(this.defaultDate().startDateForm);
    this.endDateForm.setValue(this.defaultDate().endDateForm);
  }

  ngOnInit(): void {
    this.filterApplied = this.myTimesheetService.dataFilterMyTimesheet();
    this.getTimesheet(this.startDateForm.value, this.endDateForm.value);
    this.getMatter('');
  }

  /** Geting timesheet from MyTimesheetService */
  getTimesheet(startDate: string, endDate: string): void {
    this.subscription = this.myTimesheetService
      .getTimesheetWithRange(startDate, endDate)
      .pipe(map((res) => (this.dataTimesheet = res.result)))
      .subscribe();
  }

  /** Getting Matter from MyTimesheetService */
  getMatter(search: string): void {
    this.subscription = this.myTimesheetService
      .getMatters(search)
      .pipe(map((res) => (this.mattersData = res.result)))
      .subscribe();
  }

  /** Pagination changes */
  onPageChangeOut(event: { page: number; itemsPerPage: number }): void {
    this.page = event.page;
    this.limit = event.itemsPerPage;
    // this.filterTimesheet(
    //   this.startDateFilter,
    //   this.endDateFilter,
    //   this.selectedMatterFilter,
    //   this.descriptionFilter,
    //   event.page,
    //   event.itemsPerPage
    // );
  }

  timesheetSelectedOut(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
    console.log(event);
  }

  clearSelectionOut(event: MyTimesheetDTO[]): void {
    this.timesheetSelected = event;
    console.log(event);
  }
}
