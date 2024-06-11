import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ButtonIconComponent,
  CheckboxComponent,
  ComboBoxComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
} from '@quantum/fui';
import dayjs from 'dayjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    DatePickerComponent,
    SkeletonComponent,
  ],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent {
  loading: boolean = true;
  selectedActivity: { name: string; value: any }[] = [];
  optionActivity: { name: string; value: any }[] = [
    {
      name: 'Data Cleaning',
      value: 'Removing null values and correcting errors',
    },
    {
      name: 'Data Transformation',
      value: 'Converting data types and normalizing values',
    },
    {
      name: 'Data Aggregation',
      value: 'Summarizing data into meaningful statistics',
    },
    {
      name: 'Data Visualization',
      value: 'Creating charts and graphs to represent data',
    },
    {
      name: 'Data Analysis',
      value: 'Identifying patterns and insights from data',
    },
    {
      name: 'Data Mining',
      value: 'Discovering hidden patterns in large datasets',
    },
    { name: 'Data Collection', value: 'Gathering data from various sources' },
    {
      name: 'Data Storage',
      value: 'Saving data in databases or other storage systems',
    },
    {
      name: 'Data Validation',
      value: 'Ensuring data accuracy and consistency',
    },
    {
      name: 'Data Integration',
      value: 'Combining data from different sources',
    },
  ];

  selectedDate: string = '';
  dateFormControl: FormControl = new FormControl(dayjs().format('YYYY/MM/DD'));
  isInvalid: boolean = false;
  errorMessage: string = 'Input is not valid.';

  constructor(private readonly myTimesheetService: MyTimesheetService) {}

  private subscription!: Subscription;

  ngOnInit(): void {
    setTimeout(() => {
      this.subscription = this.myTimesheetService.data$.subscribe(
        (value: boolean | null) => {
          if (value === true) {
            this.loading = false;
          }
          if (value === false) {
            this.loading = false;
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

  onChangeHandler(value: string) {
    this.selectedDate = value;
  }

  onValidateHandler(value: boolean) {
    this.isInvalid = value;
  }
}
