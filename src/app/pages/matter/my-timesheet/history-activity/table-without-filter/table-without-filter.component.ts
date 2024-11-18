import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  HorizontalStackComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextComponent,
} from '@quantum/fui';

import { BaseController } from '../../../../../core/controller/basecontroller';
import { MyTimesheetPerDay } from '../../../../../interfaces/my-timesheet-per-day.dto';
import { FormsModule } from '@angular/forms';
import { MyTimesheetDTO } from '../../../../../interfaces/my-timesheet.dto';

@Component({
  selector: 'app-table-without-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CollapsibleNavGroupComponent,
    HorizontalStackComponent,
    BadgeComponent,
    ButtonIconComponent,
    TextComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyRowComponent,
    TableBodyComponent,
    TableBodyDataComponent,
  ],
  templateUrl: './table-without-filter.component.html',
  styleUrl: './table-without-filter.component.scss',
})
export class TableWithoutFilterComponent extends BaseController {
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Output() selectionOut: EventEmitter<MyTimesheetDTO[]> = new EventEmitter<
    MyTimesheetDTO[]
  >();
  @Output() actionOut: EventEmitter<{
    action: 'edit' | 'editTag' | 'delete';
    data: MyTimesheetDTO;
  }> = new EventEmitter<{
    action: 'edit' | 'editTag' | 'delete';
    data: MyTimesheetDTO;
  }>();

  /** Data for day to day */
  dataTimesheetPerday: MyTimesheetPerDay[] = [];

  /** Timesheet Selected */
  timesheetSelected: MyTimesheetDTO[] = [];

  /** Header Table */
  headerTable: string[] = ['Matter#', 'Description', 'Duration', ''];

  constructor() {
    super();
    this.initializeDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.dataTimesheet.length > 0) {
        this.initializeDateWithParams(this.startDate, this.endDate);
        this.groupTimesheetsByDate();
      }
    }
  }

  /** Initialization date per week */
  initializeDate(): void {
    const currentDate = new Date();
    this.startDate = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    this.startDate.setDate(currentDate.getDate() - offset);
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 6);

    this.dataTimesheetPerday = [];
    for (
      let i = new Date(this.startDate);
      i <= this.endDate;
      i.setDate(i.getDate() + 1)
    ) {
      this.dataTimesheetPerday.push({
        date: this.formatDate(i),
        data: [],
        show: false,
        selectAll: false,
      });
    }
  }

  /** Initialization date per week use param */
  initializeDateWithParams(startDate: Date, endDate: Date): void {
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.dataTimesheetPerday = [];

    for (
      let i = new Date(this.startDate);
      i <= this.endDate;
      i.setDate(i.getDate() + 1)
    ) {
      this.dataTimesheetPerday.push({
        date: this.formatDate(i),
        data: [],
        show: false,
        selectAll: false,
      });
    }
  }

  /** Toggle Select All */
  toggleSelectAll(status: boolean, data: MyTimesheetDTO[]): void {
    if (status) {
      data
        .filter((timesheet) => !timesheet.pending)
        .forEach((timesheet) => {
          if (!this.timesheetSelected.includes(timesheet)) {
            this.timesheetSelected.push(timesheet);
          }
        });
    } else {
      this.timesheetSelected = this.timesheetSelected.filter(
        (timesheet) => !data.includes(timesheet) || timesheet.pending
      );
    }
    this.selectionOut.emit(this.timesheetSelected);
  }

  /** Toggle select timesheet */
  toggleSelectTimesheet(
    data: MyTimesheetDTO,
    idx: number,
    dts: MyTimesheetDTO[]
  ): void {
    const index = this.timesheetSelected.findIndex(
      (selected) => selected.uuid === data.uuid
    );
    if (index > -1) {
      this.timesheetSelected.splice(index, 1);
    } else {
      this.timesheetSelected.push(data);
    }
    this.dataTimesheetPerday[idx].selectAll =
      this.timesheetSelected.length ===
      dts.filter((timesheet) => !timesheet.pending).length;
    this.selectionOut.emit(this.timesheetSelected);
  }

  /** Groupingg timesheet */
  groupTimesheetsByDate(): void {
    this.dataTimesheetPerday.forEach((day, i) => {
      this.dataTimesheet.forEach((timesheet) => {
        if (day.date === timesheet.date) {
          this.dataTimesheetPerday[i].data.push(timesheet);
        }
      });
    });
  }

  /** Toggle edit or delete */
  toggleEditDeleteTimesheet(
    action: 'edit' | 'editTag' | 'delete',
    data: MyTimesheetDTO
  ): void {
    this.actionOut.emit({
      action,
      data,
    });
  }
}
