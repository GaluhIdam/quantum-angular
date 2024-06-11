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
  TimeSelectionComponent,
} from '@quantum/fui';
import dayjs from 'dayjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { Subscription } from 'rxjs';
import { SampleDataMyTimeSheet } from '../services/sample-data';

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
    TimeSelectionComponent,
  ],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent {
  loading: boolean = true;
  selectedActivity: { name: string; value: any }[] = [];
  optionActivity: { name: string; value: any }[] = [];

  selectedDate: string = '';
  dateFormControl: FormControl = new FormControl(dayjs().format('YYYY/MM/DD'));
  isInvalid: boolean = false;
  errorMessage: string = 'Input is not valid.';

  constructor(private readonly myTimesheetService: MyTimesheetService) {}

  private subscription!: Subscription;

  ngOnInit(): void {
    this.optionActivity = SampleDataMyTimeSheet.optionActivity;
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
