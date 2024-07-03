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
} from '../../../dtos/my-timesheet.dto';
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
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
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
import { MyTimesheetService } from '../../../services/my-timesheet.service';
import { BaseController } from '../../../../../../core/controller/basecontroller';
import { EmptyDataComponent } from '../../../../../../shared/empty-data/empty-data.component';
import { debounceTime, map, Subscription, tap } from 'rxjs';

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
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    PopoverComponent,
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
  @Input() filterDate: boolean = false;
  @Input() listActivity: ActivityDTO[] = [];
  @Input() listMatters: MatterDTO[] = [];
  @Output() trigger: EventEmitter<any> = new EventEmitter<any>();

  optionActivity: { name: string; value: any }[] = [];
  optionMatter: { name: string; value: any }[] = [];

  /** Data header table */
  headerTable: string[] = ['Matter#', 'Description', 'Duration', ''];

  /** Data for show/hide table in row per row */
  showHideTablePerRow: boolean[] = [];
  showHideEdit: boolean[][] = [];

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

  /** Search Matter */
  searchMatter: FormControl = new FormControl('');
  /** For hide sub matter if checked */
  hideSubMatter: boolean = false;

  subscription!: Subscription;

  constructor(private readonly myTimesheetService: MyTimesheetService) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.searchMatter.valueChanges
      .pipe(
        debounceTime(500),
        tap((value) => this.getMatter(value))
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChange): void {
    if (changes) {
      this.showHideTablePerRow = [];
      this.showHideEdit = [];
      this.dateTimesheetByDate.forEach((item) => {
        this.showHideTablePerRow.push(false);
        if (item.data.length > 0) {
          const editArray: boolean[] = [];
          item.data.forEach(() => {
            editArray.push(false);
          });
          this.showHideEdit.push(editArray);
        } else {
          this.showHideEdit.push([]);
        }
      });
      this.optionActivity = [];
      this.listActivity.forEach((item) => {
        this.optionActivity.push({
          name: item.activity,
          value: item.idActivity,
        });
      });
      this.closeAllFormEdit();
      this.progressStackConverter();
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
    this.openModalEditTag = false;
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

  /** Selection activity */
  selection(event: { name: string; value: any }[]): void {
    this.selectedActivity = event;
  }

  /** Toggle for show or hide row */
  toggleOpenOrCloseTablePerRow(index: number): void {
    this.showHideTablePerRow[index] = !this.showHideTablePerRow[index];
  }

  /** Cancel Edit without filter */
  toggleCloseTablePerRow(index: number, subIndex: number): void {
    this.showHideEdit[index][subIndex] = false;
  }

  /** Show edit without filter */
  toggleFormEdit(index: number, subIndex: number, data: MyTimesheetDTO): void {
    this.closeAllFormEdit();

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
    this.showHideEdit[index][subIndex] = true;
  }

  /** Reset Form Edit */
  closeAllFormEdit(): void {
    this.showHideEdit = [];
    this.dateTimesheetByDate.forEach((item) => {
      this.showHideTablePerRow.push(false);
      if (item.data.length > 0) {
        const editArray: boolean[] = [];
        item.data.forEach(() => {
          editArray.push(false);
        });
        this.showHideEdit.push(editArray);
      } else {
        this.showHideEdit.push([]);
      }
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
  }

  /** Close Modal Delete */
  closelModalDelete(): void {
    this.openModalDelete = false;
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

  /** Getting Matter from MyTimesheetService */
  getMatter(search: string): void {
    this.myTimesheetService
      .getMatters(search)
      .pipe(map((res) => (this.listMatters = res.result)))
      .subscribe();
  }
}
