import { Component } from '@angular/core';
import { ProductivityComponent } from './productivity/productivity.component';
import { YtdProductivityComponent } from './ytd-productivity/ytd-productivity.component';
import { HistoryActivityComponent } from './history-activity/history-activity.component';
import { PageEmptyComponent } from '../../../shared/page-empty/page-empty.component';

@Component({
  selector: 'app-my-timesheet',
  standalone: true,
  imports: [
    ProductivityComponent,
    YtdProductivityComponent,
    HistoryActivityComponent,
    PageEmptyComponent,
  ],
  templateUrl: './my-timesheet.component.html',
  styleUrl: './my-timesheet.component.scss',
})
export class MyTimesheetComponent {
  /** Period */
  period: 'month' | 'year' | 'appraisalYear' = 'month';

  /** Watch changes from productivity */
  typeChanger(event: 'month' | 'year' | 'appraisalYear'): void {
    this.period = event;
  }
}
