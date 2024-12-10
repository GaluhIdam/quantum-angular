import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';
import {
  ButtonIconComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  InputFieldComponent,
  PrependComponent,
  TextareaComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-flyout-retainer-term',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlyoutSimpleComponent,
    TextComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    DatePickerComponent,
    PrependComponent,
    TextareaComponent,
    ButtonIconComponent,
  ],
  templateUrl: './flyout-retainer-term.component.html',
  styleUrl: './flyout-retainer-term.component.scss',
})
export class FlyoutRetainerTermComponent {
  @Input() isFlyoutRetainerTerm: boolean = false;
  @Input() title: string = 'Add Retainer Term';
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Retainer Term Form Flyout */
  retainerPaymentOrderForm: FormControl = new FormControl('');
  retainerPeriodForm: FormControl = new FormControl('');
  retainerAmountForm: FormControl = new FormControl('');
  retainerDurationForm: FormControl = new FormControl('');
  retainerDescForm: FormControl = new FormControl('');
  dataRetainer: {
    status?: 'Collected' | 'Written-off';
    addOn?: string;
    paymentOrder: number;
    period: string;
    amount: string;
    hours: number;
    desc: string;
  }[] = [
    {
      status: 'Collected',
      addOn: '1140/2024',
      paymentOrder: 1,
      period: 'Jan 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
    {
      status: 'Collected',
      addOn: '1140/2024',
      paymentOrder: 2,
      period: 'Feb 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
    {
      paymentOrder: 3,
      period: 'Mar 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
    {
      status: 'Written-off',
      paymentOrder: 4,
      period: 'Apr 2024',
      amount: '6,000.00',
      hours: 10,
      desc: 'USD3.000/month with time allocation no more than 10 hours',
    },
  ];
  addEditRetainer: boolean = true;

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

  /** Open/Close flyout retianer term */
  openFlyouRetainerTerm(): void {
    this.isFlyoutRetainerTerm = !this.isFlyoutRetainerTerm;
    this.retainerPaymentOrderForm.setValue('');
    this.retainerDescForm.setValue('');
    this.retainerAmountForm.setValue('');
    this.retainerPeriodForm.setValue('');
    this.retainerDurationForm.setValue('');
    this.closeOut.emit(this.isFlyoutRetainerTerm);
  }
}
