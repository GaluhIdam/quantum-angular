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
  IconsComponent,
  PaginationComponent,
  TextComponent,
} from '@quantum/fui';
import { MyTimesheetDTO } from '../../dtos/my-timesheet.dto';
import { BaseController } from '../../../../../core/controller/basecontroller';
import { EmptyDataComponent } from '../../../../../shared/empty-data/empty-data.component';
@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [
    CommonModule,
    ButtonIconComponent,
    EmptyDataComponent,
    IconsComponent,
    PaginationComponent,
    BadgeComponent,
    TextComponent,
  ],
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent extends BaseController {
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() page: number = 1;
  @Input() limit: number = 10;
  @Input() totalItems: number = 100;
  @Input() timesheetSelected: MyTimesheetDTO[] = [];

  @Output() action: EventEmitter<{
    action: string;
    flyout: boolean;
    data: MyTimesheetDTO;
  }> = new EventEmitter<{
    action: string;
    flyout: boolean;
    data: MyTimesheetDTO;
  }>();
  @Output() onPageChangeOut: EventEmitter<{
    page: number;
    itemsPerPage: number;
  }> = new EventEmitter<{ page: number; itemsPerPage: number }>();
  @Output() timesheetSelectedOut: EventEmitter<MyTimesheetDTO[]> =
    new EventEmitter<MyTimesheetDTO[]>();

  headerTable: string[] = ['Date', 'Matter#', 'Description', 'Duration', ''];

  /** Data for show/hide table in row per row */
  showHideEdit: boolean[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['timesheetSelected']) {
      this.updateShowHideEdit();
    }
  }

  /** Action button in table */
  actionBtn(param: string, data: MyTimesheetDTO): void {
    this.action.emit({
      action: param,
      flyout: true,
      data: data,
    });
  }

  /** Pagination toggle */
  onPageChange(event: any): void {
    this.onPageChangeOut.emit(event);
  }

  /** If checked will push data to timesheetChecked */
  checkItem(item: MyTimesheetDTO): void {
    const idx = this.timesheetSelected.findIndex(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
    if (idx !== -1) {
      this.timesheetSelected.splice(idx, 1);
    } else {
      this.timesheetSelected.push(item);
    }
    this.timesheetSelectedOut.emit(this.timesheetSelected);
    this.updateShowHideEdit();
  }

  /** Check All Timesheet */
  checkAllItems(items: MyTimesheetDTO[]): void {
    if (this.timesheetSelected.length === items.length) {
      this.timesheetSelected = [];
    } else {
      this.timesheetSelected = [...items];
    }
    this.timesheetSelectedOut.emit(this.timesheetSelected);
    this.updateShowHideEdit();
  }

  /** Check if item is in timesheetSelected or not */
  isItemChecked(item: MyTimesheetDTO): boolean {
    return this.timesheetSelected.some(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
  }

  /** Update the showHideEdit array based on the current timesheetSelected */
  private updateShowHideEdit(): void {
    this.showHideEdit = this.dataTimesheet.map((item) =>
      this.timesheetSelected.some(
        (selectedItem) => selectedItem.idTimesheet === item.idTimesheet
      )
    );
  }
}
