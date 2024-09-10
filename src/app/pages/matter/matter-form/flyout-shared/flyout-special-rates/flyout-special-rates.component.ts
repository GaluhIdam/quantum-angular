import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';
import {
  ButtonIconComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  InputFieldComponent,
  PrependComponent,
  SelectFieldComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-flyout-special-rates',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlyoutSimpleComponent,
    TextComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    PrependComponent,
    InputFieldComponent,
    DatePickerComponent,
    ButtonIconComponent,
  ],
  templateUrl: './flyout-special-rates.component.html',
  styleUrl: './flyout-special-rates.component.scss',
})
export class FlyoutSpecialRatesComponent {
  @Input() isFlyoutSpecialRates: boolean = false;
  @Input() title: string = 'Add Special Rates';
  @Input() isMatterMemberForm: boolean = false;
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Special rate form flyout */
  matterNumberForm: FormControl = new FormControl('');
  matterNumberOption: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'Jane Cooper (JC)',
      value: 'Jane Cooper (JC)',
    },
    {
      label: 'Devon Lane (DL)',
      value: 'Devon Lane (DL)',
    },
    {
      label: 'Robert Fox (RF)',
      value: 'Robert Fox (RF)',
    },
  ];
  rateForm: FormControl = new FormControl('');
  startPeriodRateForm: FormControl = new FormControl('');
  endPeriodRateForm: FormControl = new FormControl('');
  dataSpecialRate: {
    member: string;
    position: string;
    rates: { rate: number; start: string; end: string }[];
  }[] = [
    {
      member: 'Jane Cooper (JC)',
      position: 'Senior Associates',
      rates: [
        {
          rate: 300,
          start: '1 Feb, 2024',
          end: '28 Feb, 2024',
        },
        {
          rate: 250,
          start: '1 Jan, 2024',
          end: '31 Jan, 2024',
        },
      ],
    },
  ];

  /** Currency Form */
  currencyForm: FormControl = new FormControl('USD');
  currencyOption: { label: string; value: string }[] = [
    {
      label: 'IDR',
      value: 'IDR',
    },
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
  ];

  /** Open/Close Special Rates */
  openCloseFlyout(): void {
    this.matterNumberForm.setValue('');
    this.rateForm.setValue('');
    this.startPeriodRateForm.setValue('');
    this.endPeriodRateForm.setValue('');
    this.isFlyoutSpecialRates = !this.isFlyoutSpecialRates;
    this.closeOut.emit(this.isFlyoutSpecialRates);
  }
}
