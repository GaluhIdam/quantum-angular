import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
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
  TextareaComponent,
  TextComponent,
  TimeSelectionComponent,
  TooltipComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import { MyTimesheetDTO } from '../../interfaces/my-timesheet.dto';

@Component({
  selector: 'shared-flyout-timesheet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlyoutComponent,
    FlyoutHeaderComponent,
    FlyoutBodyComponent,
    FlyoutFooterComponent,
    TextComponent,
    ButtonIconComponent,
    IconsComponent,
    TooltipComponent,
    FormControlLayoutComponent,
    ValidatorFieldComponent,
    ComboBoxComponent,
    DatePickerComponent,
    TimeSelectionComponent,
    BadgeComponent,
    TextareaComponent,
  ],
  templateUrl: './flyout-timesheet.component.html',
  styleUrl: './flyout-timesheet.component.scss',
})
export class FlyoutTimesheetComponent {
  /** Flyout config */
  @Input() isOpenFlyout: boolean = false;
  @Input() title: string = 'Flyout';
  @Input() note: string = '';
  @Input() timesheet!: MyTimesheetDTO;

  /** Action button */
  @Input() actionButton: 'create' | 'update' | 'updateTag' = 'create';

  /** Required data */
  @Input() listFeeEarner: { name: string; value: any }[] = [];
  @Input() listMatters: { name: string; value: any }[] = [];
  @Input() listActivities: { name: string; value: any }[] = [];
  @Input() timesheetSelected?: MyTimesheetDTO;

  /** show/hide form */
  @Input() showFeeEarnerForm: boolean = true;
  @Input() showActivityForm: boolean = true;
  @Input() showObjectEventForm: boolean = true;
  @Input() showTopicForm: boolean = true;
  @Input() showAddDescForm: boolean = true;
  @Input() showMatterForm: boolean = true;
  @Input() showDateForm: boolean = true;
  @Input() showDurationForm: boolean = true;
  @Input() showCheckLockDate: boolean = true;
  @Input() showCheckLockMatter: boolean = true;

  /** enable/disable form */
  @Input() enableFeeEarnerForm: boolean = true;
  @Input() enableActivityForm: boolean = true;
  @Input() enableObjectEventForm: boolean = true;
  @Input() enableTopicForm: boolean = true;
  @Input() enableAddDescForm: boolean = true;
  @Input() enableMatterForm: boolean = true;
  @Input() enableDateForm: boolean = true;
  @Input() enableDurationForm: boolean = true;

  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Fee earner Form */
  feeEarnerForm: FormControl = new FormControl('', Validators.required);
  optionFeeEarner: { name: string; value: any }[] = [];
  selectedFeeEarner: { name: string; value: any }[] = [];

  /** Activity Form */
  activityForm: FormControl = new FormControl('', Validators.required);
  optionActivity: { name: string; value: any }[] = [];
  selectedActivity: { name: string; value: any }[] = [];

  /** Objet/Event Form */
  objectEventForm: FormControl = new FormControl('', Validators.required);
  topicForm: FormControl = new FormControl('', Validators.required);
  addDescForm: FormControl = new FormControl('', Validators.required);

  /** Matter Form */
  matterForm: FormControl = new FormControl('', Validators.required);
  optionMatter: { name: string; value: any }[] = [];
  selectedOptionMatter: { name: string; value: any }[] = [];

  dateFormControl: FormControl = new FormControl('', Validators.required);

  durationForm: FormControl = new FormControl('', Validators.required);

  lockMatter: boolean = false;
  lockDate: boolean = false;

  ngOnInit(): void {
    if (this.enableFeeEarnerForm) {
      this.feeEarnerForm.enable();
    } else {
      this.feeEarnerForm.disable();
    }

    if (this.enableActivityForm) {
      this.activityForm.enable();
    } else {
      this.activityForm.disable();
    }

    if (this.enableActivityForm) {
      this.activityForm.enable();
    } else {
      this.activityForm.disable();
    }

    if (this.enableObjectEventForm) {
      this.objectEventForm.enable();
    } else {
      this.objectEventForm.disable();
    }

    if (this.enableTopicForm) {
      this.topicForm.enable();
    } else {
      this.topicForm.disable();
    }

    if (this.enableAddDescForm) {
      this.addDescForm.enable();
    } else {
      this.addDescForm.disable();
    }

    if (this.enableMatterForm) {
      this.matterForm.enable();
    } else {
      this.matterForm.disable();
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.timesheetSelected) {
      this.activityForm = new FormControl(this.timesheetSelected.activity.name);
      this.objectEventForm = new FormControl(
        this.timesheetSelected.activity.name
      );
      this.topicForm = new FormControl(this.timesheetSelected.activity.name);
      this.addDescForm = new FormControl(this.timesheetSelected.activity.name);
      this.dateFormControl = new FormControl(
        formatDate(this.timesheetSelected.date, 'dd-MM-yyyy', 'en')
      );
      this.durationForm = new FormControl(this.timesheetSelected.duration);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (event) {
      this.toggleCloseFlyout();
    }
  }

  /** Close flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
    this.feeEarnerForm = new FormControl();
    this.activityForm = new FormControl();
    this.objectEventForm = new FormControl();
    this.topicForm = new FormControl();
    this.addDescForm = new FormControl();
    this.dateFormControl = new FormControl();
    this.durationForm = new FormControl();
    this.closeOut.emit(false);
  }
}
