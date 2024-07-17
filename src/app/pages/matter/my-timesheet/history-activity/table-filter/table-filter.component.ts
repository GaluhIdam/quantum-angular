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
  ComboBoxComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  PaginationComponent,
  TextComponent,
  TimeSelectionComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import {
  ActivityDTO,
  MyTimesheetDTO,
  MyTimesheetPostDTO,
} from '../../dtos/my-timesheet.dto';
import { BaseController } from '../../../../../core/controller/basecontroller';
import { EmptyDataComponent } from '../../../../../shared/empty-data/empty-data.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyTimesheetService } from '../../services/my-timesheet.service';
import { EditTagTimesheetFlyoutComponent } from '../../../../../shared/edit-tag-timesheet-flyout/edit-tag-timesheet-flyout.component';
import { EditTimesheetFlyoutComponent } from '../../../../../shared/edit-timesheet-flyout/edit-timesheet-flyout.component';
import { ModalDeleteComponent } from '../../../../../shared/modal-delete/modal-delete.component';

@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BadgeComponent,
    ButtonIconComponent,
    EmptyDataComponent,
    ComboBoxComponent,
    FormControlLayoutComponent,
    DatePickerComponent,
    IconsComponent,
    InputFieldComponent,
    TimeSelectionComponent,
    ValidatorFieldComponent,
    PaginationComponent,
    TextComponent,
    EditTagTimesheetFlyoutComponent,
    EditTimesheetFlyoutComponent,
    ModalDeleteComponent,
  ],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss',
})
export class TableFilterComponent extends BaseController {
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() page: number = 1;
  @Input() limit: number = 10;
  @Input() totalItems: number = 100;
  @Output() onPageChangeOut: EventEmitter<{
    page: number;
    itemsPerPage: number;
  }> = new EventEmitter<{ page: number; itemsPerPage: number }>();
  @Output() trigger: EventEmitter<any> = new EventEmitter<any>();
  @Output() timesheetCheckedOut: EventEmitter<MyTimesheetDTO[]> =
    new EventEmitter<MyTimesheetDTO[]>();

  optionActivity: { name: string; value: any }[] = [];
  optionMatter: { name: string; value: any }[] = [];

  headerTable: string[] = ['Date', 'Matter#', 'Description', 'Duration', ''];

  /** Data for show/hide table in row per row */
  showHideEdit: boolean[] = [];

  /** Variable for search activity combo box */
  activitySearch: FormControl = new FormControl('', Validators.required);

  /** Varible for send to request */
  uuid: string = '';
  selectedActivity: { name: string; value: any }[] = [];
  objectEventForm: FormControl = new FormControl('', Validators.required);
  dateFormControl: FormControl = new FormControl('', Validators.required);
  durationForm: FormControl = new FormControl('', Validators.required);
  matterSearch: FormControl = new FormControl('', Validators.required);
  timeDescForm: FormControl = new FormControl('', Validators.required);
  addDescForm: FormControl = new FormControl('', Validators.required);
  matterId: number = 0;
  officialCategoryId: number = 0;

  /** Modal Variable */
  openModalDelete: boolean = false;

  /** Check or uncheck timsheet */
  timesheetChecked: MyTimesheetDTO[] = [];

  /** Open edit tag flyout */
  isOpenFlyoutTagEdit: boolean = false;

  /** Open edit flyout */
  isOpenFlyoutEdit: boolean = false;

  constructor(private readonly myTimesheetService: MyTimesheetService) {
    super();
  }

  /** Update Timesheet from MyTimesheetService  */
  updateTimesheet(uuid: string): void {
    let request: MyTimesheetPostDTO = {
      description: this.objectEventForm.value,
      date: this.dateFormControl.value,
      duration: this.durationForm.value,
      matterId: this.matterId,
      activityId: this.selectedActivity[0].value,
      officialCategoryId: this.officialCategoryId,
    };
    this.myTimesheetService.putTimesheet(uuid, request).subscribe((res) => {
      this.toggleToast(
        'success',
        'Success!',
        'check',
        'The data was successfuly updated!',
        'sizel'
      );
      this.closeAllFormEdit();
      this.trigger.emit(res);
    });
  }

  /** Delete Timesheet from MyTimesheetService */
  deleteTimesheet(uuid: string): void {
    this.myTimesheetService.deleteTimesheet(uuid).subscribe((res) => {
      this.toggleToast(
        'success',
        'Success!',
        'check',
        'The data was successfuly deleted!',
        'sizel'
      );
      this.trigger.emit(res);
    });
  }

  /** Show edit form */
  toggleFormEdit(index: number, data: MyTimesheetDTO): void {
    this.isOpenFlyoutEdit = true;
    this.closeAllFormEdit();
    this.showHideEdit[index] = true;

    this.uuid = data.uuid;
    this.matterId = data.matter.idMatter;
    this.officialCategoryId = data.officialCategory.idOfficialCategory;
    this.objectEventForm.setValue(data.description);
    this.dateFormControl.setValue(data.date);
    this.durationForm.setValue(data.duration);
    const selected: { name: string; value: any }[] = [
      {
        name: data.activity.activity,
        value: data.activity.idActivity,
      },
    ];
    this.selectedActivity = selected;
  }

  /** Pagination toggle */
  onPageChange(event: any): void {
    this.onPageChangeOut.emit(event);
  }

  /** Reset Form Edit */
  closeAllFormEdit(): void {
    this.showHideEdit = [];
    this.dataTimesheet.forEach(() => {
      this.showHideEdit.push(false);
    });
  }

  /** Open Modal Edit Tag */
  openEditTagModal(param: string, data: MyTimesheetDTO): void {
    this.isOpenFlyoutTagEdit = true;
    this.uuid = param;
    this.matterId = data.matter.idMatter;
    this.officialCategoryId = data.officialCategory.idOfficialCategory;
    this.objectEventForm.setValue(data.description);
    this.dateFormControl.setValue(data.date);
    this.durationForm.setValue(data.duration);
    this.timeDescForm.setValue(data.description);
    const selected: { name: string; value: any }[] = [
      {
        name: data.activity.activity,
        value: data.activity.idActivity,
      },
    ];
    this.activitySearch.setValue(selected[0].name);
    this.selectedActivity = selected;
  }

  /** Selection activity */
  selection(event: { name: string; value: any }[]): void {
    this.selectedActivity = event;
  }

  /** If checked will push data to timesheetChecked */
  checkItem(item: MyTimesheetDTO): void {
    const idx = this.timesheetChecked.findIndex(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
    if (idx !== -1) {
      this.timesheetChecked.splice(idx, 1);
    } else {
      this.timesheetChecked.push(item);
    }
    this.timesheetCheckedOut.emit(this.timesheetChecked);
  }

  /** Check All Timesheet */
  checkAllItems(items: MyTimesheetDTO[]): void {
    if (this.timesheetChecked.length === items.length) {
      this.timesheetChecked = [];
    } else {
      this.timesheetChecked = [...items];
    }
    this.timesheetCheckedOut.emit(this.timesheetChecked);
  }

  /** Check if item is in timesheetChecked or not */
  isItemChecked(item: MyTimesheetDTO): boolean {
    return this.timesheetChecked.some(
      (dto) => dto.idTimesheet === item.idTimesheet
    );
  }

  /** Catch return from flyout edit tag */
  closeOutEditTag(event: boolean): void {
    this.isOpenFlyoutTagEdit = event;
  }

  /** Catch return from flyout edit */
  closeOutEdit(event: boolean): void {
    this.isOpenFlyoutEdit = event;
  }

  /** Open Modal Delete */
  openDeleteModal(param: string): void {
    this.openModalDelete = true;
    this.uuid = param;
  }

  /** Close Modal Delete */
  cancelOut(event: boolean): void {
    this.openModalDelete = event;
  }
}
