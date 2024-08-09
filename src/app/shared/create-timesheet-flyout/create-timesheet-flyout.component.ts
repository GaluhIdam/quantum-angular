import { CommonModule } from '@angular/common';
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
  LoadingComponent,
  TextComponent,
  TimeSelectionComponent,
  TooltipComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import {
  ActivityDTO,
  MatterDTO,
} from '../../pages/matter/my-timesheet/dtos/my-timesheet.dto';

@Component({
  selector: 'app-create-timesheet-flyout',
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
    TooltipComponent,
    LoadingComponent,
  ],
  templateUrl: './create-timesheet-flyout.component.html',
  styleUrl: './create-timesheet-flyout.component.scss',
})
export class CreateTimesheetFlyoutComponent {
  @Input() isOpenFlyout: boolean = false;
  @Input() title: string = 'Add Timesheet';
  @Input() note: string = '';
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Show/Hide Form */
  @Input() feeEarner: boolean = false;

  /** Form enable/disable */
  @Input() enableActivitySearchForm: boolean = true;
  @Input() enableObjectEventForm: boolean = true;
  @Input() enableMatterSearchForm: boolean = true;
  @Input() enableDateForm: boolean = true;
  @Input() enableDurationForm: boolean = true;

  /** Required data */
  @Input() listMatters: MatterDTO[] = [];
  @Input() listActivities: ActivityDTO[] = [];

  /** Activity Form */
  activitySearch: FormControl = new FormControl('', Validators.required);
  optionActivity: { name: string; value: any }[] = [];
  selectedActivity: { name: string; value: any }[] = [];
  activityForm: FormControl = new FormControl('', Validators.required);

  /** Fee earner Form */
  feeEarnerSearch: FormControl = new FormControl('', Validators.required);
  optionFeeEarner: { name: string; value: any }[] = [];
  selectedFeeEarner: { name: string; value: any }[] = [];
  feeEarnerForm: FormControl = new FormControl('', Validators.required);

  /** Objet/Event Form */
  objectEventForm: FormControl = new FormControl('', Validators.required);

  /** Matter Form */
  matterSearch: FormControl = new FormControl('', Validators.required);
  optionMatter: { name: string; value: any }[] = [];
  selectedOptionMatter: { name: string; value: any }[] = [];
  matterForm: FormControl = new FormControl('', Validators.required);

  dateFormControl: FormControl = new FormControl('', Validators.required);

  durationForm: FormControl = new FormControl('', Validators.required);

  lockMatter: boolean = false;
  lockDate: boolean = false;

  ngOnInit(): void {
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
      this.lockMatter = false;
    } else {
      this.matterSearch.disable();
      this.lockMatter = true;
    }

    if (this.enableDateForm) {
      this.dateFormControl.enable();
      this.lockDate = false;
    } else {
      this.lockDate = true;
      this.dateFormControl.disable();
    }

    if (this.enableDurationForm) {
      this.durationForm.enable();
    } else {
      this.durationForm.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listMatters']) {
      this.dataTransformMatter();
    }
    if (changes['listActivities']) {
      this.dataTransformActivity();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.toggleCloseFlyout();
  }

  /** Transform data matters to be options */
  dataTransformMatter(): void {
    if (this.listMatters.length > 0) {
      this.listMatters.forEach((item) => {
        this.optionMatter.push({
          name: item.matter,
          value: item.idMatter,
        });
      });
    }
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

  /** Toggle for open flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
    this.closeOut.emit(this.isOpenFlyout);

    this.activityForm.reset();
    this.activitySearch.reset();

    this.matterSearch.reset();
    this.matterForm.reset();

    this.objectEventForm.reset();

    this.dateFormControl.reset();

    this.durationForm.reset();
  }

  /** Selector for fee earner */
  selectionFeeEarner(event: any): void {
    if (event && event.length > 0) {
      this.selectedFeeEarner = event;
      this.feeEarnerForm.setValue(event[0].value);
    }
  }

  /** Selector for activity */
  selectionActivity(event: any): void {
    if (event && event.length > 0) {
      this.selectedActivity = event;
      this.activityForm.setValue(event[0].value);
    }
  }

  /** Selector for Matter */
  selectionMatter(event: { name: string; value: any }[]): void {
    this.selectedOptionMatter = event;
    if (event.length > 0) {
      this.matterForm.setValue(event[0].value);
    }
  }

  /** Lock Matter */
  onCheckboxChangeMatter(event: any) {
    this.lockMatter = event.target.checked;
    if (this.lockMatter) {
      this.matterSearch.disable();
    } else {
      this.matterSearch.enable();
    }
  }

  /** Lock Date */
  onCheckboxChangeDate(event: any) {
    this.lockDate = event.target.checked;
    if (this.lockDate) {
      this.dateFormControl.disable();
    } else {
      this.dateFormControl.enable();
    }
  }
}
