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
import { PageEmptyComponent } from '../../../shared/page-empty/page-empty.component';
import {
  ActivityTimesheetDTO,
  MatterTimesheetDTO,
} from '../../../interfaces/my-timesheet.dto';

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
  mattersData: MatterTimesheetDTO[] = [];
  activitesData: ActivityTimesheetDTO[] = [];
}
