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
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextComponent,
} from '@quantum/fui';
import { BaseController } from '../../../../../core/controller/basecontroller';
import { FormsModule } from '@angular/forms';
import { MyTimesheetDTO } from '../../../../../interfaces/my-timesheet.dto';
@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BadgeComponent,
    ButtonIconComponent,
    TextComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyRowComponent,
    TableBodyComponent,
    TableBodyDataComponent,
  ],
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent extends BaseController {
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() timesheetSelected: MyTimesheetDTO[] = [];
  @Input() page: number = 1;
  @Input() limit: number = 10;
  @Input() totalItems: number = 100;
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

  /** Header Table */
  headerTable: string[] = ['Matter#', 'Description', 'Duration', ''];

  /** Select all status */
  selectAllStatus: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['timesheetSelected']) {
        if (this.timesheetSelected.length === 0) {
          this.selectAllStatus = false;
        }
      }
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
  toggleSelectTimesheet(data: MyTimesheetDTO, idx: number): void {
    const index = this.timesheetSelected.findIndex(
      (selected) => selected.uuid === data.uuid
    );
    if (index > -1) {
      this.timesheetSelected.splice(index, 1);
    } else {
      this.timesheetSelected.push(data);
    }
    this.selectAllStatus =
      this.timesheetSelected.length ===
      this.dataTimesheet.filter((timesheet) => !timesheet.pending).length;
    this.selectionOut.emit(this.timesheetSelected);
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
