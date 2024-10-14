import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Icon,
  IconsComponent,
  Size,
  TabsComponent,
  TabsContentComponent,
  TextComponent,
} from '@quantum/fui';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { InformationComponent } from './information/information.component';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-detail-matter',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabsComponent,
    TabsContentComponent,
    TextComponent,
    IconsComponent,
    OverviewComponent,
    TimesheetComponent,
    ExpensesComponent,
    InformationComponent,
  ],
  templateUrl: './detail-matter.component.html',
  styleUrl: './detail-matter.component.scss',
})
export class DetailMatterComponent {
  loading: boolean = false;

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
      active: false,
      icon: 'visArea',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Overview',
    },
    {
      active: true,
      icon: 'document',
      sideIcon: 'left',
      sizeIcon: 'sizem',
      title: 'Information',
    },
    {
      active: false,
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
