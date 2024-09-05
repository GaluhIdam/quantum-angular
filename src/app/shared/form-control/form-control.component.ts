import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppendComponent,
  Color,
  ComboBoxComponent,
  FormControlLayoutComponent,
  Icon,
  IconsComponent,
  InputFieldComponent,
  PrependComponent,
  SelectFieldComponent,
  TextareaComponent,
  TextComponent,
  TooltipComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';

@Component({
  selector: 'shared-form-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsComponent,
    TextComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ValidatorFieldComponent,
    ComboBoxComponent,
    SelectFieldComponent,
    AppendComponent,
    PrependComponent,
    TooltipComponent,
    TextareaComponent,
  ],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss',
})
export class FormControlComponent {
  @Input() label?: string;
  @Input() labelTooltip?: string;
  @Input() placeholder: string = 'Type this form!';
  @Input() formControl: FormControl = new FormControl('');
  @Input() disabled: boolean = false;
  @Input() type: 'search' | 'combo-box' | 'text' | 'select' | 'textarea' =
    'text';
  @Input() selectOptions!: {
    label: string;
    value: any;
  }[];
  @Input() optionValue: { name: string; value: any }[] = [];
  @Input() selectedValue: { name: string; value: any }[] = [];
  @Input() invalid: boolean = false;
  @Input() validationMsg: string = 'This form is required!';
  @Input() checkbox?: {
    label: string;
    model: boolean;
    action?: 'disabled' | 'hidden';
    tooltip?: string;
  };
  @Input() prepend?: {
    type: 'text' | 'icon';
    icon?: Icon;
    text?: string;
    color: Color;
  };
  @Input() append?: {
    type: 'text' | 'icon';
    icon?: Icon;
    text?: string;
    color: Color;
  };
  @Input() leftIcon: Icon | null = null;
  @Input() rightIcon: Icon | null = null;

  @Output() checkboxOut: EventEmitter<{
    label: string;
    model: boolean;
    disabled?: boolean;
    tooltip?: string;
  }> = new EventEmitter<{
    label: string;
    model: boolean;
    disabled?: boolean;
    tooltip?: string;
  }>();

  checkboxAct(): void {
    if (this.checkbox) {
      this.checkbox.model = !this.checkbox.model;
      if (this.checkbox.model && this.checkbox.action === 'disabled') {
        this.formControl.disabled;
      }
      this.checkboxOut.emit(this.checkbox);
    }
  }
}
