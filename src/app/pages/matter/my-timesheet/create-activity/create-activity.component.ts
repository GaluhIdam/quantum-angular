import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonIconComponent,
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
import { MyTimesheetService } from '../services/my-timesheet.service';
import {
  ActivityDTO,
  MatterDTO,
  MyTimesheetPostDTO,
} from '../dtos/my-timesheet.dto';
import { CommonModule } from '@angular/common';
import { UserKeycloakDTO } from '../../../../core/dtos/response.dto';
import { map } from 'rxjs';

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
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent {
  @Input() mattersData: MatterDTO[] = [];
  @Input() activitesData: ActivityDTO[] = [];

  loading: boolean = true;
  lockMatter: boolean = false;
  lockDate: boolean = false;

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
  dateFormControl: FormControl = new FormControl('', Validators.required);
  isInvalid: boolean = false;
  errorMessage: string = 'Input is not valid.';

  userDataKeycloak: UserKeycloakDTO[] = [];

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
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.mappingMatter(this.mattersData);
      this.mappingActivity(this.activitesData);
    }
  }

  /** Getting official category from service */
  getOffcialCategory(): void {
    this.myTimesheetService
      .getActivity('')
      .pipe(
        map((res) => {
          this.optionOfficeCategory = [];
          res.result.forEach((item) => {
            if (item.idActivity === this.selectedActivity[0].value) {
              item.officialCategoryEntityList.forEach((itm) => {
                this.optionOfficeCategory.push({
                  name: itm.officialCategory,
                  value: itm.idOfficialCategory,
                });
              });
            }
          });
        })
      )
      .subscribe();
  }

  /** Mapping matters data for option*/
  mappingMatter(matterData: MatterDTO[]): void {
    this.optionMatter = [];
    matterData.forEach((item) => {
      this.optionMatter.push({
        name: item.matter,
        value: item.idMatter,
      });
    });
  }

  /** Mapping activities data for option */
  mappingActivity(activitesData: ActivityDTO[]): void {
    this.activitesData = [];
    activitesData.forEach((item) => {
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
  }

  /** Create Timesheet from MyTimesheetService */
  createTimesheet(): void {
    if (this.formPostTimesheet.valid) {
      const date = new Date(this.dateFormControl.value);
      const formattedDate = date.toISOString().split('T')[0];
      const dto: MyTimesheetPostDTO = {
        activityId: this.activityForm.value,
        description: `${this.objectEventForm.value} ${this.topicForm.value} ${this.addDescForm.value}`,
        matterId: this.matterForm.value,
        officialCategoryId: this.officialCategoryForm.value,
        date: formattedDate,
        duration: this.durationForm.value,
      };
      this.myTimesheetService.postTimesheet(dto).subscribe((res) => {
        if (res.status === 'CREATED') {
          this.handleSuccessToast('success');
          this.activitySearch.reset();
          this.officialCategorySearch.reset();
          this.activityForm.reset();
          this.objectEventForm.reset();
          this.topicForm.reset();
          this.addDescForm.reset();
          this.officialCategoryForm.reset();
          this.durationForm.reset();
          this.selectedActivity = [];
          this.selectedOptionCategory = [];
          if (!this.lockMatter) {
            this.selectedOptionMatter = [];
            this.matterSearch.reset();
            this.matterForm.reset();
          }
          if (!this.lockDate) {
            this.dateFormControl.reset();
            console.log('dead');
          }
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
    if (event && event.length > 0) {
      this.selectedActivity = event;
      this.activityForm.setValue(event[0].value);
      this.officialCategorySearch.setValue('');
      this.selectedOptionCategory = [];
      this.getOffcialCategory();
    }
  }

  /** Selector for official category */
  selectionOfficialCategory(event: any): void {
    this.selectedOptionCategory = event;
    this.officialCategoryForm.setValue(event[0].value);
  }

  /** Selector for Matter */
  selectionMatter(event: any): void {
    this.selectedOptionMatter = event;
    this.matterForm.setValue(event[0].value);
  }

  /** Lock Matter */
  onCheckboxChangeMatter(event: any) {
    this.lockMatter = event.target.checked;
  }

  /** Lock Date */
  onCheckboxChangeDate(event: any) {
    this.lockDate = event.target.checked;
    console.log(this.lockDate);
  }
}
