import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetDTO,
  MyTimesheetPostDTO,
  TimesheetByDateDTO,
} from '../../dtos/my-timesheet.dto';
import {
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  Color,
  ComboBoxComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  HorizontalStackComponent,
  IconsComponent,
  InputFieldComponent,
  PopoverComponent,
  TimeSelectionComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyTimesheetService } from '../../services/my-timesheet.service';
import { BaseController } from '../../../../../core/controller/basecontroller';
import { EmptyDataComponent } from '../../../../../shared/empty-data/empty-data.component';
import { debounceTime, map, Subscription, tap } from 'rxjs';
import { EditTagTimesheetFlyoutComponent } from '../../../../../shared/layouts/edit-tag-timesheet-flyout/edit-tag-timesheet-flyout.component';
import { ModalDeleteComponent } from '../../../../../shared/layouts/modal-delete/modal-delete.component';
import { EditTimesheetFlyoutComponent } from '../../../../../shared/layouts/edit-timesheet-flyout/edit-timesheet-flyout.component';

@Component({
  selector: 'app-table-without-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CollapsibleNavGroupComponent,
    HorizontalStackComponent,
    BadgeComponent,
    ButtonIconComponent,
    IconsComponent,
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ValidatorFieldComponent,
    DatePickerComponent,
    TimeSelectionComponent,
    EmptyDataComponent,
    PopoverComponent,
    EmptyDataComponent,
    EditTagTimesheetFlyoutComponent,
    EditTimesheetFlyoutComponent,
    ModalDeleteComponent,
  ],
  templateUrl: './table-without-filter.component.html',
  styleUrl: './table-without-filter.component.scss',
})
export class TableWithoutFilterComponent extends BaseController {
  /** Data will input from History Activity */
  @Input() dateTimesheetByDate: TimesheetByDateDTO[] = [];
  progress: {
    percentage: number;
    color: Color;
  }[][] = [];

  @Input() filterDate: boolean = false;

  /** Parsing data timesheet selected to History Component for move matter */
  @Output() timesheetSelectedOut: EventEmitter<MyTimesheetDTO[]> =
    new EventEmitter<MyTimesheetDTO[]>();

  /** Parsing data timesheet and status flyout to History Component for update */
  @Output() clickOpenEdit: EventEmitter<{
    flyout: boolean;
    data: MyTimesheetDTO;
  }> = new EventEmitter<{
    flyout: boolean;
    data: MyTimesheetDTO;
  }>();

  /** Parsing data timesheet with TAGGED and status flyout to History Component for update */
  @Output() clickOpenEditTag: EventEmitter<{
    flyout: boolean;
    data: MyTimesheetDTO;
  }> = new EventEmitter<{
    flyout: boolean;
    data: MyTimesheetDTO;
  }>();

  /** Parsing data UUID timesheet and status modal to History Component for delete */
  @Output() clickOpenModalDelete: EventEmitter<{
    modal: boolean;
    uuid: string;
  }> = new EventEmitter<{
    modal: boolean;
    uuid: string;
  }>();

  /** Data header table */
  headerTable: string[] = ['Matter#', 'Description', 'Duration', ''];

  /** Data for show/hide table in row per row */
  showHideTablePerRow: boolean[] = [];

  /** Variable for search activity combo box */
  activitySearch: FormControl = new FormControl('', Validators.required);

  /** Varible for send to request */
  selectedActivity: { name: string; value: any }[] = [];

  /** Search Matter */
  searchMatter: FormControl = new FormControl('');

  /** For hide sub matter if checked */
  hideSubMatter: boolean = false;

  /** Check or uncheck timsheet */
  timesheetChecked: MyTimesheetDTO[][] = [];
  timesheetSelected: MyTimesheetDTO[] = [];

  ngOnChanges(changes: SimpleChange): void {
    if (changes) {
      this.showHideTablePerRow = [];
      this.timesheetChecked = [];
      this.dateTimesheetByDate.forEach((item) => {
        this.showHideTablePerRow.push(false);
        this.timesheetChecked.push([]);
        if (item.data.length > 0) {
          const editArray: boolean[] = [];
          item.data.forEach(() => {
            editArray.push(false);
          });
        }
      });
      this.progressStackConverter();
    }
  }

  /** Selection activity */
  selection(event: { name: string; value: any }[]): void {
    this.selectedActivity = event;
  }

  /** Toggle for show or hide row */
  toggleOpenOrCloseTablePerRow(index: number): void {
    this.showHideTablePerRow[index] = !this.showHideTablePerRow[index];
  }

  /** Progress stack converter */
  progressStackConverter(): void {
    this.progress = [];
    this.dateTimesheetByDate.forEach((item) => {
      this.progress.push([
        {
          percentage: this.calculateTotalDurationTagPercent(item.data)
            .untaggedPercentage,
          color: 'primary',
        },
        {
          percentage: this.calculateTotalDurationTagPercent(item.data)
            .remainingPercentage,
          color: 'text',
        },
        {
          percentage: this.calculateTotalDurationTagPercent(item.data)
            .taggedPercentage,
          color: 'warning',
        },
      ]);
    });
  }

  /** Toggle for check or uncheck matter in popover change matter */
  checkHideMatter(): void {
    this.hideSubMatter = !this.hideSubMatter;
  }

  /** If checked will push data to timesheetChecked */
  checkItem(index: number, item: MyTimesheetDTO): void {
    const idx = this.timesheetChecked[index].findIndex(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
    if (idx !== -1) {
      this.timesheetChecked[index].splice(idx, 1);
    } else {
      this.timesheetChecked[index].push(item);
    }
    this.timesheetSelected = this.timesheetChecked.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
    this.timesheetSelectedOut.emit(this.timesheetSelected);
  }

  /** Check All Timesheet */
  checkAllItems(index: number, items: MyTimesheetDTO[]): void {
    if (this.timesheetChecked[index].length === items.length) {
      this.timesheetChecked[index] = [];
    } else {
      this.timesheetChecked[index] = [...items];
    }
    this.timesheetSelected = this.timesheetChecked.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
    this.timesheetSelectedOut.emit(this.timesheetSelected);
  }

  /** Check if item is in timesheetChecked or not */
  isItemChecked(index: number, item: MyTimesheetDTO): boolean {
    return this.timesheetChecked[index].some(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
  }

  /** Open flyout edit form and parsing data */
  toggleOpenEditFlyout(data: MyTimesheetDTO): void {
    this.clickOpenEdit.emit({
      flyout: true,
      data,
    });
  }

  /** Open flyout edit tag form and parsing data */
  toggleOpenEditTagFlyout(data: MyTimesheetDTO): void {
    this.clickOpenEditTag.emit({
      flyout: true,
      data,
    });
  }

  /** Open modal delete and parsing UUID */
  openDeleteModal(uuid: string): void {
    this.clickOpenModalDelete.emit({
      modal: true,
      uuid,
    });
  }
}
