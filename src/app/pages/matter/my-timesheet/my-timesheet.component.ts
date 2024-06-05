import { Component } from '@angular/core';
import { ComboBoxComponent } from '@quantum/fui';
import { ProductivityComponent } from './productivity/productivity.component';
import { YtdProductivityComponent } from './ytd-productivity/ytd-productivity.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { HistoryActivityComponent } from './history-activity/history-activity.component';

@Component({
  selector: 'app-my-timesheet',
  standalone: true,
  imports: [
    ComboBoxComponent,
    ProductivityComponent,
    YtdProductivityComponent,
    CreateActivityComponent,
    HistoryActivityComponent,
  ],
  templateUrl: './my-timesheet.component.html',
  styleUrl: './my-timesheet.component.scss',
})
export class MyTimesheetComponent {}
