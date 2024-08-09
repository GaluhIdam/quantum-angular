import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MyTimesheetDTO,
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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseController } from '../../../../../core/controller/basecontroller';
import { EmptyDataComponent } from '../../../../../shared/empty-data/empty-data.component';
import { EditTagTimesheetFlyoutComponent } from '../../../../../shared/edit-tag-timesheet-flyout/edit-tag-timesheet-flyout.component';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';
import { EditTimesheetFlyoutComponent } from '../../../../../shared/edit-timesheet-flyout/edit-timesheet-flyout.component';

@Component({
  selector: 'app-table-without-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  @Input() dateTimesheetByDate: TimesheetByDateDTO[] = [];
  progress: {
    percentage: number;
    color: Color;
  }[][] = [];
  @Input() timesheetSelected: MyTimesheetDTO[] = [];

  @Output() timesheetSelectedOut: EventEmitter<MyTimesheetDTO[]> =
    new EventEmitter<MyTimesheetDTO[]>();

  @Output() action: EventEmitter<{
    action: string;
    flyout: boolean;
    data: MyTimesheetDTO;
  }> = new EventEmitter<{
    action: string;
    flyout: boolean;
    data: MyTimesheetDTO;
  }>();

  headerTable: string[] = ['Matter#', 'Description', 'Duration', ''];

  showHideTablePerRow: boolean[] = [];

  activitySearch: FormControl = new FormControl('', Validators.required);

  selectedActivity: { name: string; value: any }[] = [];

  searchMatter: FormControl = new FormControl('');

  hideSubMatter: boolean = false;

  timesheetChecked: MyTimesheetDTO[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateTimesheetByDate']) {
      this.dateTimesheetByDate.forEach((item, index) => {
        if (!this.showHideTablePerRow[index]) {
          this.showHideTablePerRow[index] = false;
        }
        if (!this.timesheetChecked[index]) {
          this.timesheetChecked[index] = [];
        }
      });
      this.progressStackConverter();
    }

    if (changes['timesheetSelected']) {
      this.syncCheckedItems();
    }
  }

  syncCheckedItems(): void {
    // If timesheetSelected is empty, uncheck all checkboxes
    if (this.timesheetSelected.length === 0) {
      this.timesheetChecked = this.timesheetChecked.map(() => []);
    } else {
      // Update timesheetChecked based on timesheetSelected
      this.dateTimesheetByDate.forEach((date, index) => {
        this.timesheetChecked[index] = date.data.filter((item) =>
          this.timesheetSelected.some(
            (selected) => selected.idTimesheet === item.idTimesheet
          )
        );
      });
    }
  }

  selection(event: { name: string; value: any }[]): void {
    this.selectedActivity = event;
  }

  openOrCloseTablePerRow(index: number): void {
    this.showHideTablePerRow[index] = !this.showHideTablePerRow[index];
  }

  progressStackConverter(): void {
    this.progress = this.dateTimesheetByDate.map((item) => [
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
  }

  checkHideMatter(): void {
    this.hideSubMatter = !this.hideSubMatter;
  }

  checkItem(index: number, item: MyTimesheetDTO): void {
    const itemIndex = this.timesheetChecked[index].findIndex(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
    if (itemIndex !== -1) {
      this.timesheetChecked[index].splice(itemIndex, 1);
    } else {
      this.timesheetChecked[index].push(item);
    }
    this.updateTimesheetSelected();
  }

  checkAllItems(index: number, items: MyTimesheetDTO[]): void {
    if (this.timesheetChecked[index].length === items.length) {
      this.timesheetChecked[index] = [];
    } else {
      this.timesheetChecked[index] = [...items];
    }
    this.updateTimesheetSelected();
  }

  isItemChecked(index: number, item: MyTimesheetDTO): boolean {
    return this.timesheetChecked[index].some(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
  }

  updateTimesheetSelected(): void {
    this.timesheetSelected = this.timesheetChecked.flat();
    this.timesheetSelectedOut.emit(this.timesheetSelected);
  }

  /** Action */
  actionBtn(param: string, data: MyTimesheetDTO): void {
    this.action.emit({
      action: param,
      flyout: true,
      data: data,
    });
  }
}
