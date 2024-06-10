import { SampleDataMyTimeSheet } from './../services/sample-data';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  Color,
  ComboBoxComponent,
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
} from '@quantum/fui';
import { DailyActivityDTO, HourActivityDTO } from '../dtos/my-timesheet.dto';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { BaseController } from '../../../../core/controller/basecontroller';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { Subscription } from 'rxjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';

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
  ],
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
})
export class HistoryActivityComponent extends BaseController {
  loading: boolean = true;
  startDate: Date = new Date();
  endDate!: Date;
  filterStatus: boolean = false;
  page: number = 0;
  limit: number = 10;
  totalItems: number = 0;
  title: string[] = ['Date', 'Matter#', 'Description', 'Duration', ''];
  titleSub: string[] = ['Matter#', 'Description', 'Duration', ''];
  timesheetsData: DailyActivityDTO[] = [
    {
      date: new Date('2024-05-20T07:05:59'),
      activityList: [],
    },
    {
      date: new Date('2024-05-20T07:05:59'),
      activityList: [],
    },
    {
      date: new Date('2024-05-20T07:05:59'),
      activityList: [],
    },
  ];
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
  showHideData: boolean[] = [];

  isOpenFlyout: boolean = false;
  optionMatter: { name: string; value: any }[] = [
    {
      name: '5030',
      value: 5030,
    },
    {
      name: 'Profdev',
      value: 'Profdev',
    },
  ];
  selectedMatter: { name: string; value: any }[] = [
    {
      name: '5030',
      value: 5030,
    },
  ];

  constructor(private readonly myTimesheetService: MyTimesheetService) {
    super();
  }

  private subscription!: Subscription;

  ngOnInit(): void {
    setTimeout(() => {
      this.subscription = this.myTimesheetService.data$.subscribe(
        (value: boolean | null) => {
          if (value === true) {
            this.progress = SampleDataMyTimeSheet.progress;
            this.timesheetsData = SampleDataMyTimeSheet.history_activity;
            this.loading = false;
          }
          if (value === false) {
            this.progress = [];
            this.timesheetsData = [];
            this.loading = false;
          }
          if (value === null) {
            this.progress = [
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
            this.timesheetsData = [
              {
                date: new Date('2024-05-20T07:05:59'),
                activityList: [],
              },
              {
                date: new Date('2024-05-20T07:05:59'),
                activityList: [],
              },
              {
                date: new Date('2024-05-20T07:05:59'),
                activityList: [],
              },
            ];
            this.loading = true;
          }
        }
      );
    }, 2000);
    this.endDate = this.getDateWithRange(this.startDate, 6).endDate;
    this.insertShowHideRow();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Next or Previous Date */
  moveDate(move: 'next' | 'previous', range: number): void {
    const newDate = new Date(this.startDate); // Clone startDate to avoid mutation
    if (move === 'next') {
      newDate.setDate(newDate.getDate() + range);
    } else {
      newDate.setDate(newDate.getDate() - range);
    }
    this.startDate = newDate;
    this.endDate = this.getDateWithRange(newDate, range).endDate;
  }

  /** Activity Checker */
  hasMentionType(activityList: HourActivityDTO[]): boolean {
    return activityList.some((activity) => activity.type === 'mention');
  }

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

  /** Insert data for status button collapsible row */
  insertShowHideRow(): void {
    this.showHideData = new Array(this.timesheetsData.length).fill(false);
  }

  /** Toggle for show or hide row */
  toggleRow(index: number): void {
    this.showHideData[index] = !this.showHideData[index];
  }

  /** Filter Toggle */
  toggleFilter(): void {
    this.filterStatus = !this.filterStatus;
  }
}
