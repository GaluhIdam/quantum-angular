import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  TextComponent,
  TimeSelectionComponent,
  TooltipComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';

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

  /** Toggle for open flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
    this.closeOut.emit(this.isOpenFlyout);
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
  selectionMatter(event: any): void {
    this.selectedOptionMatter = event;
    this.matterForm.setValue(event[0].value);
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
