import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonIconComponent,
  Icon,
  IconsComponent,
  Size,
  TabsComponent,
  TabsContentComponent,
} from '@quantum/fui';
import { CreateActivityComponent } from '../../my-timesheet/create-activity/create-activity.component';
import { HistoryActivityComponent } from '../../my-timesheet/history-activity/history-activity.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { CreateTimesheetComponent } from './create-timesheet/create-timesheet.component';

@Component({
  selector: 'app-detail-matter',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonIconComponent,
    TabsComponent,
    TabsContentComponent,
    IconsComponent,
    CreateActivityComponent,
    HistoryActivityComponent,
    ExpensesComponent,
    CreateTimesheetComponent,
  ],
  templateUrl: './detail-matter.component.html',
  styleUrl: './detail-matter.component.scss',
})
export class DetailMatterComponent {
  dataTabs: {
    active: boolean | 'disabled';
    icon?: Icon;
    sideIcon?: 'right' | 'left';
    sizeIcon?: Size;
    prepend?: string;
    append?: string;
    title: string;
  }[] = [
    {
      active: 'disabled',
      icon: 'visArea',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Overview',
    },
    {
      active: 'disabled',
      icon: 'document',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Information',
    },
    {
      active: true,
      icon: 'clock',
      sideIcon: 'left',
      sizeIcon: 'sizel',
      title: 'Timesheet',
    },
    {
      active: false,
      icon: 'tag',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Expenses',
    },
    {
      active: 'disabled',
      icon: 'folderOpen',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Documents',
    },
  ];
}
