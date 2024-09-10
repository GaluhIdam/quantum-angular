import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  PrependComponent,
  TextareaComponent,
  TextComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-flyout-lumpsum-term',
  standalone: true,
  imports: [
    CommonModule,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ValidatorFieldComponent,
    TextareaComponent,
    TextComponent,
    ButtonIconComponent,
    FlyoutSimpleComponent,
    PrependComponent,
  ],
  templateUrl: './flyout-lumpsum-term.component.html',
  styleUrl: './flyout-lumpsum-term.component.scss',
})
export class FlyoutLumpsumTermComponent {
  @Input() isFlyoutLumpsumTerm: boolean = false;
  @Input() title: string = 'Add Lumpsum Term';
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**  Lumpsum Term Form Flyout */
  lumpsumPaymentOrderForm: FormControl = new FormControl(
    '',
    Validators.required
  );
  lumpsumAmountForm: FormControl = new FormControl('', Validators.required);
  lumpsumdescForm: FormControl = new FormControl('', Validators.required);
  dataLumpsum: {
    status?: 'Collected' | 'Written-off';
    addOn?: string;
    paymentOrder: number;
    desc: string;
    amount: string;
  }[] = [
    {
      status: 'Collected',
      addOn: '1140/2024',
      paymentOrder: 1,
      desc: 'Billed upon completion of first phase',
      amount: '5,000.00',
    },
    {
      paymentOrder: 2,
      desc: 'Billed upon project document fully delivered',
      amount: '10,000.00',
    },
    {
      status: 'Written-off',
      paymentOrder: 3,
      desc: 'Term Bonuses, Sign Off',
      amount: '1,000.00',
    },
  ];
  addEditLumpsum: boolean = true;

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

  /** Open/Close flyout lumpsum term */
  openFlyouLumpsumTerm(): void {
    this.isFlyoutLumpsumTerm = !this.isFlyoutLumpsumTerm;
    this.lumpsumPaymentOrderForm.setValue('');
    this.lumpsumdescForm.setValue('');
    this.lumpsumAmountForm.setValue('');
    this.closeOut.emit(this.isFlyoutLumpsumTerm);
  }
}
