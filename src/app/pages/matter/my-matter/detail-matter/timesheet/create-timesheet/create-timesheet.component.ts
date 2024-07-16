import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TimeSelectionComponent,
  ToastComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-create-timesheet',
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
  templateUrl: './create-timesheet.component.html',
  styleUrl: './create-timesheet.component.scss',
})
export class CreateTimesheetComponent {}
