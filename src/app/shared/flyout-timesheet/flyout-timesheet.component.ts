import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
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
  DateRangeComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  SelectFieldComponent,
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
    InputFieldComponent,
    ValidatorFieldComponent,
    ComboBoxComponent,
    SelectFieldComponent,
    DatePickerComponent,
    DateRangeComponent,
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

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.toggleCloseFlyout();
  }

  /** Close flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
    this.feeEarnerForm.setValue('');
    this.activityForm.setValue('');
    this.objectEventForm.setValue('');
    this.topicForm.setValue('');
    this.addDescForm.setValue('');
    this.dateFormControl.setValue('');
    this.durationForm.setValue('');
    this.closeOut.emit(false);
  }
}
