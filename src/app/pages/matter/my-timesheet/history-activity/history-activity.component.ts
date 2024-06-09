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
  ProgressComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
} from '@quantum/fui';
import { DailyActivityDTO } from '../dtos/my-timesheet.dto';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { BaseController } from '../../../../core/controller/basecontroller';

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
  ],
  templateUrl: './history-activity.component.html',
  styleUrl: './history-activity.component.scss',
})
export class HistoryActivityComponent extends BaseController {
  filterStatus: boolean = false;
  page: number = 0;
  limit: number = 10;
  totalItems: number = 0;
  title: string[] = ['Date', 'Matter#', 'Description', 'Duration', ''];
  titleSub: string[] = ['Matter#', 'Description', 'Duration', ''];
  timesheetsData: DailyActivityDTO[] = [];
  progress: {
    percentage: number;
    color: Color;
  }[] = [];
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
    this.progress = SampleDataMyTimeSheet.progress;
    this.timesheetsData = SampleDataMyTimeSheet.history_activity;
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
