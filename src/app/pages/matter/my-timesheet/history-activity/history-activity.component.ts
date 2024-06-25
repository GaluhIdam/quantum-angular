import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  Color,
  ComboBoxComponent,
  DatePickerComponent,
  DateRangeComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  HorizontalStackComponent,
  IconsComponent,
  InputFieldComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ProgressBaseComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TimeSelectionComponent,
  ToastComponent,
  ToastProps,
  ToastService,
  ValidatorFieldComponent,
} from '@quantum/fui';
import {
  MyTimesheetDTO,
  MyTimesheetPostDTO,
  TimesheetByDateDTO,
} from '../dtos/my-timesheet.dto';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { BaseController } from '../../../../core/controller/basecontroller';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { map, Subscription, tap } from 'rxjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-history-activity',
  standalone: true,
  imports: [
    CommonModule,
    TableBodyComponent,
    TableBodyDataComponent,
    TableBodyRowComponent,
    TableComponent,
    TableHeadComponent,
    ButtonIconComponent,
    IconsComponent,
    BadgeComponent,
    FlyoutBodyComponent,
    FlyoutComponent,
    FlyoutFooterComponent,
    FlyoutHeaderComponent,
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    CollapsibleNavGroupComponent,
    ProgressBaseComponent,
    EmptyDataComponent,
    HorizontalStackComponent,
    SkeletonComponent,
    DateRangeComponent,
    DatePickerComponent,
    TimeSelectionComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ReactiveFormsModule,
    ValidatorFieldComponent,
    ToastComponent,
    SkeletonComponent,
  ],
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
})
export class HistoryActivityComponent extends BaseController {
  loading: boolean = true;
  isModalOpen: boolean = false;

  page: number = 0;
  limit: number = 10;
  totalItems: number = 0;

  title: string[] = ['Date', 'Matter#', 'Description', 'Duration', ''];
  titleSub: string[] = ['Matter#', 'Description', 'Duration', ''];
  progress: {
    percentage: number;
    color: Color;
  }[][] = [
    [
      {
        percentage: 50,
        color: 'primary',
      },
      {
        percentage: 50,
        color: 'text',
      },
      {
        percentage: 0,
        color: 'warning',
      },
    ],
    [
      {
        percentage: 80,
        color: 'primary',
      },
      {
        percentage: 20,
        color: 'text',
      },
      {
        percentage: 0,
        color: 'warning',
      },
    ],
    [
      {
        percentage: 10,
        color: 'primary',
      },
      {
        percentage: 90,
        color: 'text',
      },
      {
        percentage: 0,
        color: 'warning',
      },
    ],
    [
      {
        percentage: 70,
        color: 'primary',
      },
      {
        percentage: 20,
        color: 'text',
      },
      {
        percentage: 10,
        color: 'warning',
      },
    ],
  ];
  selectItem: number[] = [];

  showHideData: boolean[] = [];
  showHideEditFilter: boolean[] = [];

  isOpenFlyout: boolean = false;
  optionMatter: { name: string; value: any }[] = [];
  selectedMatter: { name: string; value: any }[] = [];

  /** Nomal Data */
  dateTimesheet: TimesheetByDateDTO[] = [];
  totalDuration: string = '';
  nowDate: Date = new Date();
  currentDate: Date = new Date();
  lastDate!: Date;
  private subscription!: Subscription;

  /** Filter Data */
  dateTimesheetFilter: MyTimesheetDTO[] = [];
  startDateForm: FormControl = new FormControl();
  endDateForm: FormControl = new FormControl();
  searchMatter: FormControl = new FormControl('');
  descForm: FormControl = new FormControl();
  /** Status Filter */
  filterDate: boolean = false;
  filterMatter: boolean = false;
  filterDesc: boolean = false;

  /** Edit */
  showHideEdit: boolean[][] = [];

  activitySearch: FormControl = new FormControl('', Validators.required);
  optionActivity: { name: string; value: any }[] = [];
  selectedActivity: { name: string; value: any }[] = [];
  objectEventForm: FormControl = new FormControl('', Validators.required);
  dateFormControl: FormControl = new FormControl('', Validators.required);
  durationForm: FormControl = new FormControl('', Validators.required);
  matterId: number = 0;
  officialCategoryId: number = 0;

  /** Delete */
  isModalDelete: boolean = false;
  uuidDelete: string = '';

  constructor(
    private readonly myTimesheetService: MyTimesheetService,
    private readonly toastService: ToastService
  ) {
    super();
    this.lastDate = new Date(this.currentDate);
    this.lastDate.setDate(this.currentDate.getDate() - 5);
  }

  ngOnInit(): void {
    this.getActivity('');
    this.getMatters('');
    this.subscription = this.myTimesheetService.data$.subscribe((update) => {
      if (update === true || update === false) {
        this.moveDate(0);
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Move Date */
  moveDate(days: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + days);
    this.currentDate = newDate;
    this.lastDate = new Date(this.currentDate);
    this.lastDate.setDate(this.currentDate.getDate() - 5);
    const startDate = this.formatDate(this.lastDate);
    const endDate = this.formatDate(this.currentDate);
    this.getTimesheet(startDate, endDate);
  }

  /** Get Matter from service */
  getMatters(search: string): void {
    this.myTimesheetService
      .getMatters(search)
      .pipe(
        map((res) => {
          this.optionMatter = [];
          res.result.forEach((data) => {
            this.optionMatter.push({
              name: data.matter,
              value: data.matter,
            });
          });
        })
      )
      .subscribe();
  }

  /** Get Timesheet */
  getTimesheet(startDate: string, endDate: string): void {
    const adjustedEndDate = this.addDays(endDate, 1);
    const adjustedStartDate = this.addDays(startDate, 0);
    const adjustedEndDateProc = this.addDays(endDate, 0);
    this.startDateForm.setValue(adjustedStartDate);
    this.endDateForm.setValue(adjustedEndDateProc);
    this.myTimesheetService
      .getTimesheetWithRange(adjustedStartDate, adjustedEndDate)
      .pipe(
        map((res) =>
          this.processTimesheets(
            res.result,
            adjustedStartDate,
            adjustedEndDateProc
          )
        ),
        map((groupedTimesheets: TimesheetByDateDTO[]) => {
          this.dateTimesheet = groupedTimesheets;
          this.totalDuration = this.calculateTotalDurationByDate(
            startDate,
            endDate
          );
        })
      )
      .subscribe();
  }

  filterFind(page: number, size: number): void {
    this.filterTimesheet(
      this.startDateForm.value,
      this.endDateForm.value,
      this.selectedMatter.map((item) => item.value).join(', '),
      this.descForm.value,
      page + 1,
      size
    );
    this.filterDate = true;
    if (this.selectedMatter.length > 0) {
      this.filterMatter = true;
    } else {
      this.filterMatter = false;
    }
    if (this.descForm.value === null || this.descForm.value === '') {
      this.filterDesc = false;
    } else {
      this.filterDate = true;
    }
  }

  invalidStartEndDate(): boolean {
    const startDate = new Date(this.startDateForm.value);
    const endDate = new Date(this.endDateForm.value);
    if (startDate < endDate) {
      return false;
    } else {
      return true;
    }
  }

  /** Filter Timesheet */
  filterTimesheet(
    startDate: string | null,
    endDate: string | null,
    matter: string | null,
    addDescription: string | null,
    page: number,
    size: number
  ): void {
    this.myTimesheetService
      .getFilterTimesheet(
        startDate,
        endDate,
        matter,
        addDescription,
        page,
        size
      )
      .pipe(
        map((res) => {
          this.showHideEditFilter = [];
          res.result.content.forEach(() => {
            this.showHideEditFilter.push(true);
          });
          this.dateTimesheetFilter = res.result.content;
          this.totalItems = res.result.totalElements;
        })
      )
      .subscribe();
  }

  /** Update Timesheet */
  updateTimesheet(index: number, subIndex: number, uuid: string): void {
    let request: MyTimesheetPostDTO = {
      description: this.objectEventForm.value,
      date: this.dateFormControl.value,
      duration: this.durationForm.value,
      matterId: this.matterId,
      activityId: this.selectedActivity[0].value,
      officialCategoryId: this.officialCategoryId,
    };
    this.myTimesheetService.putTimesheet(uuid, request).subscribe(() => {
      this.handleUpdateToast('success');
      if (this.filterDate) {
        this.filterFind(this.page, this.limit);
      }
    });
  }

  /** Delete Timesheet */
  deleteTimesheet(uuid: string): void {
    this.myTimesheetService
      .deleteTimesheet(uuid)
      .pipe(tap(() => this.moveDate(0)))
      .subscribe(() => {
        this.handleDeleteToast('success');
        if (this.filterDate) {
          this.filterFind(this.page, this.limit);
        }
        this.cancelDelete();
      });
  }

  /** Get Activity */
  getActivity(search: string): void {
    this.myTimesheetService
      .getActivity(search)
      .pipe(
        map((res) => {
          this.optionActivity = [];
          res.result.forEach((item) => {
            this.optionActivity.push({
              name: item.activity,
              value: item.idActivity,
            });
          });
        })
      )
      .subscribe();
  }

  //--- UTILITY METHOD

  /** Generate Date and Grouping Data by Date */
  private processTimesheets(
    timesheets: MyTimesheetDTO[],
    startDate: string,
    endDate: string
  ): TimesheetByDateDTO[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateRange: { [date: string]: MyTimesheetDTO[] } = {};
    const currentDate = new Date(startDate);
    while (currentDate <= end) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      dateRange[formattedDate] = [];
      currentDate.setDate(currentDate.getDate() + 1);
    }
    timesheets.forEach((timesheet: MyTimesheetDTO) => {
      const date = new Date(timesheet.date).toISOString().split('T')[0];
      if (dateRange[date]) {
        dateRange[date].push(timesheet);
      }
    });
    const groupedByDate: TimesheetByDateDTO[] = Object.keys(dateRange).map(
      (date) => ({
        date,
        data: dateRange[date],
      })
    );
    const filteredGroupedTimesheets = groupedByDate.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start;
    });
    this.showHideEdit = [];
    filteredGroupedTimesheets.forEach((day) => {
      const dayArray = [];
      for (let i = 0; i < day.data.length; i++) {
        dayArray.push(true);
      }
      this.showHideEdit.push(dayArray);
    });
    return filteredGroupedTimesheets;
  }

  /** Count All Duration/Day */
  calculateTotalDuration(timesheets: MyTimesheetDTO[]): string {
    let totalMinutes = 0;
    timesheets.forEach((timesheet) => {
      const durationParts = timesheet.duration.split(':');
      const hours = parseInt(durationParts[0], 10);
      const minutes = parseInt(durationParts[1], 10);
      totalMinutes += hours * 60 + minutes;
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  calculateTotalDurationByDate(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let totalMinutes = 0;

    this.dateTimesheet.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate >= start && entryDate <= end) {
        entry.data.forEach((timesheet) => {
          totalMinutes += this.calculateDurationInMinutes(timesheet.duration);
        });
      }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  calculateDurationInMinutes(duration: string): number {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /** Couter Duration for filter */
  calculateTotalDurationFilter(): string {
    let totalHours = 0;
    let totalMinutes = 0;

    this.dateTimesheetFilter.forEach((entry) => {
      const durationParts = entry.duration.split(':');
      const hours = parseInt(durationParts[0], 10);
      const minutes = parseInt(durationParts[1], 10);

      totalHours += hours;
      totalMinutes += minutes;
    });
    if (totalMinutes >= 60) {
      const additionalHours = Math.floor(totalMinutes / 60);
      totalHours += additionalHours;
      totalMinutes = totalMinutes % 60;
    }

    return `${totalHours}h ${totalMinutes}m`;
  }

  /** Helper Date */
  addDays(dateString: string, days: number): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return this.formatDate(date);
  }

  /** Handling For Pagination */
  onPageChanges(event: any): void {
    this.filterFind(event.page, event.itemsPerPage);
    console.log(event);
  }

  /** Handling Open Layout */
  handleOpenFlyout(): void {
    this.isOpenFlyout = true;
  }

  /** Handling Close Layout */
  handleCloseFlyout(): void {
    this.isOpenFlyout = false;
  }

  /** Toggle for show or hide row */
  toggleRow(index: number): void {
    this.showHideData[index] = !this.showHideData[index];
  }

  /** Show Edit without filter */
  toggleRowEdit(index: number, subIndex: number, data: MyTimesheetDTO): void {
    this.resetRowEdit();
    this.showHideEdit[index][subIndex] = !this.showHideEdit[index][subIndex];

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
  resetRowEdit(): void {
    this.showHideEdit = [];
    this.dateTimesheet.forEach((day) => {
      const dayArray = [];
      for (let i = 0; i < day.data.length; i++) {
        dayArray.push(true);
      }
      this.showHideEdit.push(dayArray);
    });
  }

  /** Cancel Edit without filter */
  cancelRowEdit(index: number, subIndex: number): void {
    this.showHideEdit[index][subIndex] = true;
  }

  toggleRowEditFilter(index: number, data: MyTimesheetDTO): void {
    this.resetRowEditFilter();
    this.showHideEditFilter[index] = false;
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
  resetRowEditFilter(): void {
    this.showHideEditFilter = [];
    this.dateTimesheetFilter.forEach(() => this.showHideEditFilter.push(true));
  }

  cancelRowEditFilter(index: number): void {
    this.showHideEditFilter[index] = true;
  }

  changeStartDate(event: any): void {
    this.startDateForm.setValue(event);
  }
  changeEndDate(event: any): void {
    this.endDateForm.setValue(event);
  }
  selectionFilterMatter(event: any): void {
    this.selectedMatter = event;
    this.searchMatter.setValue('');
  }

  moveTimesheet(): void {
    this.isModalOpen = true;
  }

  handleCloseModal() {
    this.isModalOpen = false;
  }

  clearFilters(): void {
    this.defaultDate();
    this.selectedMatter = [];
    this.searchMatter.setValue('');
    this.descForm.setValue('');
  }

  clearFiltersAll(): void {
    this.clearFilters();
    this.filterDate = false;
    this.filterDesc = false;
    this.filterMatter = false;
  }

  defaultDate(): void {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: string = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const day: string = currentDate.getDate().toString().padStart(2, '0');

    const currentDateC: Date = this.lastDate;
    const yearC: number = currentDateC.getFullYear();
    const monthC: string = (currentDateC.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const dayC: string = currentDateC.getDate().toString().padStart(2, '0');

    this.endDateForm.setValue(`${year}-${month}-${day}`);
    this.startDateForm.setValue(`${yearC}-${monthC}-${dayC}`);
  }

  /** Delete Confirm */
  deleteConfirm(uuid: string): void {
    this.uuidDelete = uuid;
    this.isModalDelete = true;
  }

  cancelDelete(): void {
    this.uuidDelete = '';
    this.isModalDelete = false;
  }

  /** Handle Update Toast */
  handleUpdateToast(type?: Color) {
    let toastObject: ToastProps = {
      position: 'bottom-right',
      header: {
        title: 'Update Successful!',
        icon: 'iInCircle',
        colorIcon: 'success',
        sizeIcon: 'sizel',
      },
      body: {
        message: 'The item has been successfully updated.',
      },

      duration: 3000,
    };
    if (type) {
      toastObject.type = type;
    }
    this.toastService.toast(toastObject);
  }

  /** Handle Delete Toast */
  handleDeleteToast(type?: Color) {
    let toastObject: ToastProps = {
      position: 'bottom-right',
      header: {
        title: 'Delete Successful!',
        icon: 'iInCircle',
        colorIcon: 'success',
        sizeIcon: 'sizel',
      },
      body: {
        message: 'The item has been successfully deleted.',
      },

      duration: 3000,
    };
    if (type) {
      toastObject.type = type;
    }
    this.toastService.toast(toastObject);
  }
}
