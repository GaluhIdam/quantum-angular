import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  PopoverComponent,
} from '@quantum/fui';
import { ProductivityComponent } from './productivity/productivity.component';
import { YtdProductivityComponent } from './ytd-productivity/ytd-productivity.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { HistoryActivityComponent } from './history-activity/history-activity.component';
import { MyTimesheetService } from './services/my-timesheet.service';
import { SkeletonComponent } from '../../../shared/skeleton/skeleton.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-timesheet',
  standalone: true,
  imports: [
    ComboBoxComponent,
    ProductivityComponent,
    YtdProductivityComponent,
    CreateActivityComponent,
    HistoryActivityComponent,
    ButtonIconComponent,
    PopoverComponent
  ],
  templateUrl: './my-timesheet.component.html',
  styleUrl: './my-timesheet.component.scss',
})
export class MyTimesheetComponent {}
