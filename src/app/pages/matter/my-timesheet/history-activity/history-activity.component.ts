import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  ComboBoxComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  ProgressBaseComponent,
  ProgressComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
} from '@quantum/fui';
import { TimesheetDTO } from '../dtos/timesheet.dto';

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
  ],
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
})
export class HistoryActivityComponent {
  filterStatus: boolean = false;
  page: number = 0;
  limit: number = 10;
  totalItems: number = 0;
  title: string[] = ['Date', 'Matter#', 'Description', 'Duration', ''];
  titleSub: string[] = ['Matter#', 'Description', 'Duration', ''];
  timesheetsData: TimesheetDTO[] = [];
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

  ngOnInit(): void {
    this.timesheetsData = [
      {
        date: new Date('2024-06-01'),
        matter: 12345,
        description: 'Meeting with client',
        duration: '1h 30m',
      },
      {
        date: new Date('2024-06-02'),
        matter: 54321,
        description: 'Research and documentation',
        duration: '2h',
      },
      {
        date: new Date('2024-06-03'),
        matter: 98765,
        description: 'Code review',
        duration: '45m',
      },
      {
        date: new Date('2024-06-04'),
        matter: 24680,
        description: 'Testing and debugging',
        duration: '1h 15m',
      },
      {
        date: new Date('2024-06-05'),
        matter: 13579,
        description: 'Team meeting',
        duration: '1h',
      },
    ];
    this.insertShowHideRow();
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
