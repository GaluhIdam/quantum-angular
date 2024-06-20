import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ButtonIconComponent,
  CheckboxComponent,
  Color,
  ComboBoxComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TimeSelectionComponent,
  ToastComponent,
  ToastProps,
  ToastService,
  ValidatorFieldComponent,
} from '@quantum/fui';
import dayjs from 'dayjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { MyTimesheetService } from '../services/my-timesheet.service';
import { debounceTime, map, Subscription } from 'rxjs';
import { SampleDataMyTimeSheet } from '../services/sample-data';
import { MyTimesheetDTO, MyTimesheetPostDTO } from '../dtos/my-timesheet.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [
    CommonModule,
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    DatePickerComponent,
    TimeSelectionComponent,
    ValidatorFieldComponent,
    ToastComponent,
  ],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent {
  loading: boolean = true;
  optionActivity: { name: string; value: any }[] = [];
  selectedActivity: { name: string; value: any }[] = [];

  optionOfficeCategory: { name: string; value: any }[] = [];
  selectedOptionCategory: { name: string; value: any }[] = [];

  optionMatter: { name: string; value: any }[] = [];
  selectedOptionMatter: { name: string; value: any }[] = [];

  officialCategorySearch: FormControl = new FormControl(
    '',
    Validators.required
  );
  activitySearch: FormControl = new FormControl('', Validators.required);
  matterSearch: FormControl = new FormControl('', Validators.required);

  formPostTimesheet!: FormGroup;
  officialCategoryForm: FormControl = new FormControl('', Validators.required);
  activityForm: FormControl = new FormControl('', Validators.required);
  matterForm: FormControl = new FormControl('', Validators.required);
  objectEventForm: FormControl = new FormControl('', Validators.required);
  topicForm: FormControl = new FormControl('', Validators.required);
  addDescForm: FormControl = new FormControl('', Validators.required);
  durationForm: FormControl = new FormControl('', Validators.required);

  selectedDate: string = '';
  dateFormControl: FormControl = new FormControl(dayjs().format('YYYY/MM/DD'));
  isInvalid: boolean = false;
  errorMessage: string = 'Input is not valid.';

  constructor(
    private readonly myTimesheetService: MyTimesheetService,
    private readonly toastService: ToastService
  ) {
    this.formPostTimesheet = new FormGroup({
      officialCategorySearch: this.officialCategoryForm,
      activitySearch: this.activityForm,
      matterSearch: this.matterForm,
      objectEventForm: this.objectEventForm,
      topicForm: this.topicForm,
      addDescForm: this.addDescForm,
      durationForm: this.durationForm,
      timeFormControl: this.durationForm,
    });
  }

  private subscription!: Subscription;

  ngOnInit(): void {
    this.getMatter(this.matterSearch.value);
    this.getActivity(this.activitySearch.value);
    this.subscription = this.activitySearch.valueChanges
      .pipe(
        debounceTime(500),
        map((res) => this.getActivity(res))
      )
      .subscribe();
    this.subscription = this.matterSearch.valueChanges
      .pipe(
        debounceTime(500),
        map((res) => this.getMatter(res))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Getting Activity Data */
  getActivity(search: string): void {
    this.myTimesheetService
      .getActivity(search)
      .pipe(
        map((res) => {
          this.optionActivity = [];
          this.optionOfficeCategory = [];
          res.result.forEach((item) => {
            this.optionActivity.push({
              name: item.activity,
              value: item.idActivity,
            });
            if (this.selectedActivity.length > 0) {
              item.officialCategoryEntityList.forEach((itm) =>
                this.optionOfficeCategory.push({
                  name: itm.officialCategory,
                  value: itm.idOfficialCategory,
                })
              );
            }
          });
        })
      )
      .subscribe();
  }

  /** Getting Matter */
  getMatter(search: string): void {
    this.myTimesheetService
      .getMatters(search)
      .pipe(
        map((res) => {
          this.optionMatter = [];
          res.result.forEach((item) => {
            this.optionMatter.push({
              name: item.matter,
              value: item.idMatter,
            });
          });
        })
      )
      .subscribe();
  }

  /** Create Timesheet */
  createTimesheet(): void {
    if (this.formPostTimesheet.valid) {
      const date = new Date(this.dateFormControl.value);
      const formattedDate = date.toISOString().split('T')[0];
      const dto: MyTimesheetPostDTO = {
        activityId: this.activityForm.value,
        objectEvent: this.objectEventForm.value,
        topic: this.topicForm.value,
        addDescription: this.addDescForm.value,
        matterId: this.matterForm.value,
        officialCategoryId: this.officialCategoryForm.value,
        date: formattedDate,
        duration: this.durationForm.value,
      };
      this.myTimesheetService.postTimesheet(dto).subscribe((res) => {
        if (res.status === 'CREATED') {
          this.handleSuccessToast('success');
          this.activitySearch.reset();
          this.matterSearch.reset();
          this.officialCategorySearch.reset();
          this.activityForm.reset();
          this.objectEventForm.reset();
          this.topicForm.reset();
          this.addDescForm.reset();
          this.matterForm.reset();
          this.officialCategoryForm.reset();
          this.dateFormControl.reset();
          this.durationForm.reset();
        }
      });
    } else {
      this.activitySearch.markAsDirty();
      this.objectEventForm.markAsDirty();
      this.topicForm.markAsDirty();
      this.addDescForm.markAsDirty();
      this.matterSearch.markAsDirty();
      this.officialCategorySearch.markAsDirty();
      this.dateFormControl.markAsDirty();
      this.durationForm.markAsDirty();
      this.handleErrorToast('danger');
    }
  }

  /** Handle Error Validation Form Toast */
  handleErrorToast(type?: Color) {
    let toastObject: ToastProps = {
      position: 'bottom-right',
      header: {
        title: 'Form Incomplete',
        icon: 'iInCircle',
        colorIcon: 'danger',
        sizeIcon: 'sizel',
      },
      body: {
        message:
          'Some required fields are missing or incorrect. Please review your entries and try again.',
      },

      duration: 3000,
    };
    if (type) {
      toastObject.type = type;
    }
    this.toastService.toast(toastObject);
  }

  /** Handle Sucess Validation Form Toast */
  handleSuccessToast(type?: Color) {
    let toastObject: ToastProps = {
      position: 'bottom-right',
      header: {
        title: 'Submission Successful!',
        icon: 'checkInCircleFilled',
        colorIcon: 'success',
      },
      body: {
        message: 'Your form has been successfully submitted. Thank you!',
      },

      duration: 3000,
    };
    if (type) {
      toastObject.type = type;
    }
    this.toastService.toast(toastObject);
  }

  /** Selector for activity */
  selectionActivity(event: any): void {
    this.selectedActivity = event;
    this.activityForm.setValue(event[0].value);
    this.officialCategorySearch.setValue('');
    this.selectedOptionCategory = [];
  }

  /** Selector for official category */
  selectionOfficialCategory(event: any): void {
    this.selectedOptionCategory = event;
    this.officialCategoryForm.setValue(event[0].value);
  }

  /** Selector for Matter */
  selectionMatter(event: any): void {
    this.selectedOptionMatter = event;
    console.log(event[0].value);
    this.matterForm.setValue(event[0].value);
  }

  onChangeHandler(value: string) {
    this.selectedDate = value;
  }

  onValidateHandler(value: boolean) {
    this.isInvalid = value;
  }

  duration(event: any): void {
    this.durationForm.setValue(event);
  }
}
