import { SampleDataMyTimeSheet } from './../services/sample-data';
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
  ProgressBaseComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TimeSelectionComponent,
} from '@quantum/fui';
import { MyTimesheetDTO, TimesheetByDateDTO } from '../dtos/my-timesheet.dto';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { BaseController } from '../../../../core/controller/basecontroller';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { debounceTime, map, Subscription } from 'rxjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { FormControl } from '@angular/forms';

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
  ],
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
})
export class HistoryActivityComponent extends BaseController {
  loading: boolean = true;

  filterStatus: boolean = false;
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

  searchMatter: FormControl = new FormControl('');

  optionActivity: { name: string; value: any }[] = [];

  showHideData: boolean[] = [];

  isOpenFlyout: boolean = false;
  optionMatter: { name: string; value: any }[] = [];
  selectedMatter: { name: string; value: any }[] = [];

  dateTimesheet: TimesheetByDateDTO[] = [];
  totalDuration: string = '';
  nowDate: Date = new Date();
  currentDate: Date = new Date();
  lastDate!: Date;
  private subscription!: Subscription;

  constructor(private readonly myTimesheetService: MyTimesheetService) {
    super();
    this.lastDate = new Date(this.currentDate);
    this.lastDate.setDate(this.currentDate.getDate() - 5);
  }

  ngOnInit(): void {
    this.loading = false;
    this.getMatters('');
    this.moveDate(0);
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
    this.getTimesheet(0, 100, startDate, endDate);
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
  getTimesheet(
    page: number,
    size: number,
    startDate: string,
    endDate: string
  ): void {
    const adjustedEndDate = this.addDays(endDate, 1);
    const adjustedStartDate = this.addDays(startDate, 0);
    const adjustedEndDateProc = this.addDays(endDate, 0);
    this.myTimesheetService
      .getTimesheetWithRange(page, size, adjustedStartDate, adjustedEndDate)
      .pipe(
        map((res) =>
          this.processTimesheets(
            res.result,
            adjustedStartDate,
            adjustedEndDateProc
          )
        )
      )
      .subscribe((groupedTimesheets: TimesheetByDateDTO[]) => {
        this.dateTimesheet = groupedTimesheets;
        this.totalDuration = this.calculateTotalDurationByDate(
          startDate,
          endDate
        );
      });
  }

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

  /** Helper Date */
  addDays(dateString: string, days: number): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return this.formatDate(date);
  }

  //--- UTILITY METHOD

  /** Handling For Pagination */
  onPageChanges(event: any): void {
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

  /** Filter Toggle */
  toggleFilter(): void {
    this.filterStatus = !this.filterStatus;
  }

  onChangeStartDate(event: any): void {
    // this.startDate = event;
  }
  onChangeEndDate(event: any): void {
    // this.endDate = event;
  }
}
