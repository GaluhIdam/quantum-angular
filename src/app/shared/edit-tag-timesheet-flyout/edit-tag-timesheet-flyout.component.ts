import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  DatePickerComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TextComponent,
  TimeSelectionComponent,
  TooltipComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import {
  ActivityDTO,
  MyTimesheetDTO,
} from '../../pages/matter/my-timesheet/dtos/my-timesheet.dto';

@Component({
  selector: 'app-edit-tag-timesheet-flyout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlyoutBodyComponent,
    FlyoutComponent,
    FlyoutFooterComponent,
    FlyoutHeaderComponent,
    TextComponent,
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ValidatorFieldComponent,
    IconsComponent,
    DatePickerComponent,
    TimeSelectionComponent,
    ButtonIconComponent,
    BadgeComponent,
    TooltipComponent,
  ],
  templateUrl: './edit-tag-timesheet-flyout.component.html',
  styleUrl: './edit-tag-timesheet-flyout.component.scss',
  providers: [DatePipe],
})
export class EditTagTimesheetFlyoutComponent {
  /** Required data */
  @Input() isOpenFlyout: boolean = false;
  @Input() timesheet!: MyTimesheetDTO;
  @Input() listActivities: ActivityDTO[] = [];

  /** Form enable/disable */
  @Input() enableActivitySearchForm: boolean = true;
  @Input() enableObjectEventForm: boolean = true;
  @Input() enableMatterSearchForm: boolean = true;
  @Input() enableDateForm: boolean = true;
  @Input() enableDurationForm: boolean = true;

  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Activity Form */
  activitySearch: FormControl = new FormControl('', Validators.required);
  optionActivity: { name: string; value: any }[] = [];
  selectedActivity: { name: string; value: any }[] = [];
  activityForm: FormControl = new FormControl('', Validators.required);

  /** Objet/Event Form */
  objectEventForm: FormControl = new FormControl('', Validators.required);
  topicForm: FormControl = new FormControl('', Validators.required);
  addDescForm: FormControl = new FormControl('', Validators.required);

  /** Matter Form */
  matterSearch: FormControl = new FormControl('', Validators.required);
  optionMatter: { name: string; value: any }[] = [];
  selectedOptionMatter: { name: string; value: any }[] = [];
  matterForm: FormControl = new FormControl('', Validators.required);

  dateFormControl: FormControl = new FormControl('', Validators.required);

  durationForm: FormControl = new FormControl('', Validators.required);

  lockMatter: boolean = false;
  constructor(private datePipe: DatePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listActivities']) {
      this.dataTransformActivity();
    }
    if (this.enableActivitySearchForm) {
      this.activitySearch.enable();
    } else {
      this.activitySearch.disable();
    }

    if (this.enableObjectEventForm) {
      this.objectEventForm.enable();
    } else {
      this.objectEventForm.disable();
    }

    if (this.enableMatterSearchForm) {
      this.matterSearch.enable();
    } else {
      this.matterSearch.disable();
    }

    if (this.enableDateForm) {
      this.dateFormControl.enable();
    } else {
      this.dateFormControl.disable();
    }

    if (this.enableDurationForm) {
      this.durationForm.enable();
    } else {
      this.durationForm.disable();
    }

    if (this.timesheet) {
      this.activitySearch.setValue(this.timesheet.activity.activity);
      this.objectEventForm.setValue(this.timesheet.objectEvent);
      this.topicForm.setValue(this.timesheet.topic);
      this.addDescForm.setValue(this.timesheet.description);
      this.matterSearch.setValue(this.timesheet.matter.matter);
      this.dateFormControl.setValue(
        this.datePipe.transform(this.timesheet.date, 'dd-MM-yyyy')
      );
      this.durationForm.setValue(this.timesheet.duration);
    }
  }

  /** Toggle for open flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
    this.closeOut.emit(this.isOpenFlyout);
  }

  /** Selector for activity */
  selectionActivity(event: any): void {
    if (event && event.length > 0) {
      this.selectedActivity = event;
      this.activityForm.setValue(event[0].value);
    }
  }

  /** Selector for Matter */
  selectionMatter(event: any): void {
    this.selectedOptionMatter = event;
    this.matterForm.setValue(event[0].value);
  }

  /** Transform data activity to be options */
  dataTransformActivity(): void {
    if (this.listActivities.length > 0) {
      this.listActivities.forEach((item) => {
        this.optionActivity.push({
          name: item.activity,
          value: item.idActivity,
        });
      });
    }
  }
}
