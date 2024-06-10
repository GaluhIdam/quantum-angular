import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  IconsComponent,
  PopoverComponent,
  ProgressComponent,
} from '@quantum/fui';
import { SampleDataMyTimeSheet } from '../services/sample-data';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { Subscription } from 'rxjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-productivity',
  standalone: true,
  imports: [
    CommonModule,
    PopoverComponent,
    ButtonIconComponent,
    IconsComponent,
    ProgressComponent,
    EmptyDataComponent,
    SkeletonComponent,
  ],
  templateUrl: './productivity.component.html',
  styleUrl: './productivity.component.scss',
})
export class ProductivityComponent {
  loading: boolean = true;
  data: number[] = [70, 90];

  constructor(private readonly myTimesheetService: MyTimesheetService) {}

  private subscription!: Subscription;

  ngOnInit(): void {
    setTimeout(() => {
      this.subscription = this.myTimesheetService.data$.subscribe(
        (value: boolean | null) => {
          console.log(value);
          if (value === true) {
            this.loading = false;
            this.data = SampleDataMyTimeSheet.productivity;
          }
          if (value === false) {
            this.loading = false;
            this.data = [];
          }
          if (value === null) {
            this.loading = true;
          }
        }
      );
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
