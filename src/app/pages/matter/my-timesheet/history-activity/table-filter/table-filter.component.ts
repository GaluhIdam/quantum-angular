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
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  PaginationComponent,
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
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    PaginationComponent,
  ],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss',
})
export class TableFilterComponent extends BaseController {
  @Input() dataTimesheet: MyTimesheetDTO[] = [];
  @Input() listActivity: ActivityDTO[] = [];
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
  openModalEditTag: boolean = false;

  /** Check or uncheck timsheet */
  timesheetChecked: MyTimesheetDTO[] = [];

  constructor(private readonly myTimesheetService: MyTimesheetService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.optionActivity = [];
      this.listActivity.forEach((item) => {
        this.optionActivity.push({
          name: item.activity,
          value: item.idActivity,
        });
      });
      this.closeAllFormEdit();
    }
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
      this.closelModalDelete();
      this.closeModalEditTag();
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
    this.openModalEditTag = true;
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

  /** Close Modal Edit Tag */
  closeModalEditTag(): void {
    this.openModalEditTag = false;
  }

  /** Open Modal Delete */
  openDeleteModal(param: string): void {
    this.openModalDelete = true;
    this.uuid = param;
    console.log(this.openModalDelete);
  }

  /** Close Modal Delete */
  closelModalDelete(): void {
    this.openModalDelete = false;
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
}
