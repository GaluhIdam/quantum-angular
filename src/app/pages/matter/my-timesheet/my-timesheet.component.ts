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
import { MyTimesheetService } from './services/my-timesheet.service';
import { map, Subscription } from 'rxjs';
import { ActivityDTO, MatterDTO } from './dtos/my-timesheet.dto';

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
  ],
  templateUrl: './my-timesheet.component.html',
  styleUrl: './my-timesheet.component.scss',
})
export class MyTimesheetComponent {
  mattersData: MatterDTO[] = [];
  activitesData: ActivityDTO[] = [];

  constructor(private readonly myTimesheetService: MyTimesheetService) {}

  private subscription!: Subscription;

  ngOnInit(): void {
    this.getMatter('');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Getting Matter from MyTimesheetService */
  getMatter(search: string): void {
    this.subscription = this.myTimesheetService
      .getMatters(search)
      .pipe(map((res) => (this.mattersData = res.result)))
      .subscribe();
  }
}
