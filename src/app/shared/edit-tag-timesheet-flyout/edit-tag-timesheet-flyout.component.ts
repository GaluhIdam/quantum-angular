import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
})
export class EditTagTimesheetFlyoutComponent {
  @Input() isOpenFlyout: boolean = false;
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Activity Form */
  activitySearch: FormControl = new FormControl('', Validators.required);
  optionActivity: { name: string; value: any }[] = [];
  selectedActivity: { name: string; value: any }[] = [];
  activityForm: FormControl = new FormControl('', Validators.required);

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

  /** Lock Matter */
  onCheckboxChangeMatter(event: any) {
    this.lockMatter = event.target.checked;
  }
}
