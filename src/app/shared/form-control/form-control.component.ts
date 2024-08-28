import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
    disabled?: boolean;
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
}
