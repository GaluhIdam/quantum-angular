import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  PopoverComponent,
  TextComponent,
} from '@quantum/fui';
import { ProductivityComponent } from './productivity/productivity.component';
import { YtdProductivityComponent } from './ytd-productivity/ytd-productivity.component';
import { HistoryActivityComponent } from './history-activity/history-activity.component';
import { ActivityDTO, MatterDTO } from '../../../interfaces/my-timesheet-temporary.dto';
import { MyTimesheetService } from './services/my-timesheet.service';
import { map } from 'rxjs';
import { PageEmptyComponent } from '../../../shared/page-empty/page-empty.component';

@Component({
  selector: 'app-my-timesheet',
  standalone: true,
  imports: [
    ComboBoxComponent,
    ProductivityComponent,
    YtdProductivityComponent,
    HistoryActivityComponent,
    ButtonIconComponent,
    PopoverComponent,
    TextComponent,
    PageEmptyComponent,
  ],
  templateUrl: './my-timesheet.component.html',
  styleUrl: './my-timesheet.component.scss',
})
export class MyTimesheetComponent {
  mattersData: MatterDTO[] = [];
  activitesData: ActivityDTO[] = [];

  constructor(private readonly myTimesheetService: MyTimesheetService) {}

  ngOnInit(): void {
    this.getMatterData('');
    this.getActivityData();
  }

  /** Get matters from service */
  getMatterData(search: string): void {
    this.myTimesheetService
      .getMatters(search)
      .pipe(map((data) => (this.mattersData = data)))
      .subscribe();
  }

  /** Get activity from service */
  getActivityData(): void {
    this.myTimesheetService
      .getActivites()
      .pipe(
        map((data) => {
          this.activitesData = data;
        })
      )
      .subscribe();
  }
}
